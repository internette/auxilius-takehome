import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();
const httpServer = createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 4000;

const io = new Server(httpServer, {
  cors: { origin: FRONTEND_URL, methods: ['GET', 'POST', 'PATCH', 'DELETE'] }
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ ok: true }));

// ── Tasks API ─────────────────────────────────────────────────────────────────
app.get('/tasks', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description = '', status = 'todo', author } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: 'title is required' });
  if (!author?.trim()) return res.status(400).json({ error: 'author is required' });
  try {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description, status, author) VALUES ($1,$2,$3,$4) RETURNING *',
      [title.trim(), description.trim(), status, author.trim()]
    );
    const task = rows[0];
    io.emit('task:created', task);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const existing = await pool.query('SELECT * FROM tasks WHERE id=$1', [id]);
    if (!existing.rows.length) return res.status(404).json({ error: 'task not found' });
    const t = existing.rows[0];
    const { rows } = await pool.query(
      `UPDATE tasks SET
        title=$1, description=$2, status=$3
       WHERE id=$4 RETURNING *`,
      [
        title !== undefined ? title.trim() : t.title,
        description !== undefined ? description.trim() : t.description,
        status !== undefined ? status : t.status,
        id
      ]
    );
    const task = rows[0];
    io.emit('task:updated', task);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
    if (!rowCount) return res.status(404).json({ error: 'task not found' });
    io.emit('task:deleted', { id });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Socket.IO ─────────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log('client connected:', socket.id);
  socket.on('disconnect', () => console.log('client disconnected:', socket.id));
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import pg from 'pg';
import getTasks from './tasks/getTasks.js';
import addTask from './tasks/addTask.js';
import updateTask from './tasks/updateTask.js';
import deleteTask from './tasks/deleteTask.js';

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
app.get('/tasks', async (_req, res) => getTasks(_req, res, pool));

app.post('/tasks', async (req, res) => addTask(req, res, pool, io));

app.patch('/tasks/:id', async (req, res) => updateTask(req, res, pool, io));

app.delete('/tasks/:id', async (req, res) => deleteTask(req, res, pool, io));

// ── Socket.IO ─────────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log('client connected:', socket.id);
  socket.on('disconnect', () => console.log('client disconnected:', socket.id));
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
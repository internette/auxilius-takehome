import express from 'express';

export default function registerTaskRoutes(app, pool, io) {
  const router = express.Router();

  router.get('/', async (_req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at ASC');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/', async (req, res) => {
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

  router.patch('/:id', async (req, res) => {
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

  router.delete('/:id', async (req, res) => {
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

  app.use('/tasks', router);
}

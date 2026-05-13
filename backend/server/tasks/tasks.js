import express from 'express';
import getTasks from './getTasks.js';
import addTask from './addTask.js';

export default function registerTaskRoutes(app, pool, io) {
  const router = express.Router();

  router.get('/', (req, res) => getTasks(req, res, pool));

  router.post('/', (req, res) => addTask(req, res, pool, io));

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

import express from 'express';
import getTasks from './getTasks.js';
import addTask from './addTask.js';
import updateTask from './updateTask.js';

export default function registerTaskRoutes(app, pool, io) {
  const router = express.Router();

  router.get('/', (req, res) => getTasks(req, res, pool));

  router.post('/', (req, res) => addTask(req, res, pool, io));

  router.patch('/:id', async (req, res) =>  updateTask(req, res, pool, io));

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

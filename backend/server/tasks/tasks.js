import express from 'express';
import getTasks from './getTasks.js';
import addTask from './addTask.js';
import updateTask from './updateTask.js';
import deleteTask from './deleteTask.js';

export default function registerTaskRoutes(app, pool, io) {
  const router = express.Router();

  router.get('/', (req, res) => getTasks(req, res, pool));

  router.post('/', (req, res) => addTask(req, res, pool, io));

  router.patch('/:id', async (req, res) =>  updateTask(req, res, pool, io));

  router.delete('/:id', async (req, res) => deleteTask(req, res, pool, io));

  app.use('/tasks', router);
}

export default async function addTask(req, res, pool, io) {
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
}

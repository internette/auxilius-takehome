export default async function addTask(req, res, pool, io) {
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
}

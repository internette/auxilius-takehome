export default async function getTasks(req, res, pool) {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default async function deleteTask(req, res, pool, io) {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
        if (!rowCount) return res.status(404).json({ error: 'task not found' });
        io.emit('task:deleted', { id });
        res.json({ id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

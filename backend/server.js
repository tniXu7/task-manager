const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Получить все задачи
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks');
        res.json(tasks.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Создать задачу
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, status, due_date } = req.body;
        const newTask = await pool.query(
            'INSERT INTO tasks (title, description, status, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, status || 'new', due_date]
        );
        res.json(newTask.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Обновить задачу
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, due_date } = req.body;
        const updatedTask = await pool.query(
            'UPDATE tasks SET title=$1, description=$2, status=$3, due_date=$4, updated_at=NOW() WHERE id=$5 RETURNING *',
            [title, description, status, due_date, id]
        );
        res.json(updatedTask.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Удалить задачу
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

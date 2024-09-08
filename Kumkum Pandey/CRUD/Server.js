const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kumkum@130621', 
    database: 'mydatabase' 
});


db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Create a user (Create)
app.post('/users', (req, res) => {
    const user = req.body;
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        res.send('User added...');
    });
});

// Get all users (Read)
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update a user (Update)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const sql = `UPDATE users SET ? WHERE id = ${id}`;
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        res.send('User updated...');
    });
});

// Delete a user (Delete)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User deleted...');
    });
});


app.listen(5000, () => {
    console.log('Server started on port 5000');
});
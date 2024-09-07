const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kumkum@130621',
    database: 'portfolio_db'
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

app.use(express.urlencoded({ extended: true })); 


app.post('/contact', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('message').notEmpty().withMessage('Message cannot be empty')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, message } = req.body;
    const query = 'INSERT INTO contacts (email, message) VALUES (?, ?)';

    db.query(query, [email, message], (err, result) => {
        if (err) {
            return res.status(500).send('Database Error');
        }
        res.redirect('/');
    });
});


app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const projects = [
        { title: 'CRUD App', description: 'A CRUD app built with Node.js, Express, MySQL, HTML, CSS and JavaScript!', link: 'http://localhost:5000/' },
        { title: 'Portfolio Website', description: 'Personal portfolio website created with Node.js, Express, MySQL, HTML, CSS, and JavaScript', link: 'http://localhost:3000/' }
    ];

    res.render('index', { title: 'My Portfolio', name: 'Kumkum', projects: projects });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
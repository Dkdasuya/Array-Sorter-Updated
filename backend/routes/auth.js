const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const authenticateToken = require('../authMiddleware');

const router = express.Router();
const SECRET_KEY = 'array-sorter-secret-2025'; // You can store this in a .env file later

// 👉 Register route
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(sql, [username, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ error: 'User already exists or invalid data.' });
    }
    res.json({ message: 'User registered successfully!' });
  });
});

// 👉 Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '2h',
    });

    res.json({ message: 'Login successful', token });
  });
});

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you're authorized!` });
});


module.exports = router;

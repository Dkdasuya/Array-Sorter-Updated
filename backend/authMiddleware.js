const jwt = require('jsonwebtoken');
const SECRET_KEY = 'array-sorter-secret-2025'; // should match the one in auth.js

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user; // attach user to request
    next();
  });
}

module.exports = authenticateToken;

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

app.use(cors());
app.use(express.json());

// 👇 Add this line
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

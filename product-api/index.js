const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD, // Store your password in .env file
  database: 'ecom'
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL DB');
});

// GET all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json(results);
  });
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(results[0]);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

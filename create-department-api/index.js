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
  password: process.env.DB_PASSWORD,
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

// /////////////////////
// // PRODUCTS API
// /////////////////////

// // GET all products with department name
// app.get('/api/products', (req, res) => {
//   db.query(
//     `SELECT p.id, p.name, p.price, p.description, d.name AS department 
//      FROM products p 
//      JOIN departments d ON p.department_id = d.id`,
//     (err, results) => {
//       if (err) return res.status(500).json({ error: 'Database error' });
//       res.status(200).json(results);
//     }
//   );
// });

// // GET product by ID with department
// app.get('/api/products/:id', (req, res) => {
//   const id = req.params.id;
//   db.query(
//     `SELECT p.id, p.name, p.price, p.description, d.name AS department 
//      FROM products p 
//      JOIN departments d ON p.department_id = d.id 
//      WHERE p.id = ?`,
//     [id],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: 'Database error' });
//       if (results.length === 0)
//         return res.status(404).json({ error: 'Product not found' });
//       res.status(200).json(results[0]);
//     }
//   );
// });

/////////////////////
// DEPARTMENTS API
/////////////////////

// GET all departments with product count
app.get('/api/departments', (req, res) => {
  db.query(
    `SELECT d.id, d.name FROM departments d;`,
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(200).json(results);
    }
  );
});

// GET specific department
app.get('/api/departments/:id', (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM departments WHERE id = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0)
        return res.status(404).json({ error: 'Department not found' });
      res.status(200).json(results[0]);
    }
  );
});

// GET all products in a department
app.get('/api/departments/:id/products', (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM products WHERE department_id = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0)
        return res.status(404).json({ error: 'No products found for this department' });
      res.status(200).json(results);
    }
  );
});

/////////////////////
// START SERVER
/////////////////////

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

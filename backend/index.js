import mysql from 'mysql2';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app = express();

// 1. MIDDLEWARE: Essential for the button to work
app.use(cors()); 
app.use(express.json()); 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// 2. GET ROUTE: Fetches data for the list
app.get('/test-db', (req, res) => {
  connection.query('SELECT * FROM lab6 ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3. POST ROUTE: Saves Vite input to Railway
app.post('/add-mood', (req, res) => {
  const { mood } = req.body;
  const sql = "INSERT INTO lab6 (message) VALUES (?)";
  
  connection.query(sql, [mood], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
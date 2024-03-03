const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
var cors = require('cors')
const app = express();
app.use(cors())


// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'customers',
    password: 'Harsha@123',
    port: 5432,
  });
  app.use(bodyParser.json());
  
  // Create table and insert dummy data
  async function initializeDatabase() {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS customers (
          sno SERIAL PRIMARY KEY,
          customer_name TEXT,
          age INTEGER,
          phone TEXT,
          location TEXT,
          created_at TIMESTAMP
        )
      `);
  
      // Insert dummy data
      for (let i = 0; i <= 50; i++) {
        await pool.query(`
          INSERT INTO customers (customer_name, age, phone, location)
          VALUES ($1, $2, $3, $4)
        `, [`Customer ${i}`, `123456789${i.toString().padStart(2, '0')}`, `Location ${i}`]);
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
  
initializeDatabase();
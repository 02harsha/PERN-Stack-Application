const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
var cors = require('cors')
const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customers',
  password: 'Harsha@123',
  port: 5432,
});
app.use(bodyParser.json());

app.get('/customers', async (req, res) => {
  searchTerm=req.body
  try {
    const { page = 1, sortBy = 'date', sortOrder = 'ASC' ,searchTerm,sortOrder1='ASC' } = req.query;
    console.log(req.query) //output 1
    const offset = (page - 1) * 20;
  
  let query1 = `
  SELECT sno,customer_name, age, phone, location,
         DATE(created_at) as date, 
         TO_CHAR(created_at, 'HH12:MI:SS AM') as time 
  FROM customers `;


  if (searchTerm) {
    query1+=`
    WHERE customer_name ILIKE '%`+searchTerm+`%'`
    
  }
  if(sortBy==='date')
  {
    query1 += `ORDER BY ${sortBy} ${sortOrder}
    LIMIT 20 OFFSET ${offset}
  `;
  }
  else if(sortBy==='time')
  {
    query1+=`ORDER BY ${sortBy} ${sortOrder1}
    LIMIT 20 OFFSET ${offset}
  `;
  }
  else{
    query1 += `ORDER BY ${sortBy} ${sortOrder}
    LIMIT 20 OFFSET ${offset}
  `;
    

  }
console.log(query1) //output 2
const result= await pool.query(query1)
res.json(result.rows);

  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


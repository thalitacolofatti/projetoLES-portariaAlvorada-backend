import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados!');
  }
});

export default db;
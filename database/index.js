const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mvp',
  password: 'C0de',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = db;

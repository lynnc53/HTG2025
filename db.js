import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',                 // change this if you're using a different MySQL user
  password: 'Delasalle33!',    // replace with your MySQL password
  database: 'htg_backend'       // the DB you created earlier
});

connection.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

export default connection;

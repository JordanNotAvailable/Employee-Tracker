const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '1803Sasquatch1803',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  module.exports = db
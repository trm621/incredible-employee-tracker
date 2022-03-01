
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // put your mysql password here
        password: 'DB_USER_PASSWORD',
        database: 'incredible_employee_tracker'
    },
    console.log('Connected to the incredible_employee_tracker database.')
);

module.exports = db;
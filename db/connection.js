
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'NEW_USER_PASSWORD',
        database: 'employee_tracker'
    },
    console.log('Connected to the incredbile_employee_tracker database.')
);

module.exports = db;
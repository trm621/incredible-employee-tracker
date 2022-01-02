const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'NEW_USER_PASSWORD',
        database: 'team' 
    },
    console.log('Connected to the employee database.')
);

module.exports = db;
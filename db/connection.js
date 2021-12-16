const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'kPpV^$n[g~s`UpqX%|,a1],W6_D?CoJ!2fSoZ8@OYMDw`|tNCv',
        database: 'team' 
    },
    console.log('Connected to the employee database.')
);

module.exports = db;
const MySQL = require('mysql');
const { host, user, password, database } = require('../config.json');

const mysql = MySQL.createConnection({
    host: `${host}`,
    user: `${user}`,
    password: `${password}`,
    database: `${database}`,
    charset: 'utf8mb4'
});

module.exports.mysql = mysql;
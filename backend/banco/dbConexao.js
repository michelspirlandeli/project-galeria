const mysql = require('mysql');

let conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_galeria_video'
});

module.exports = conexao;
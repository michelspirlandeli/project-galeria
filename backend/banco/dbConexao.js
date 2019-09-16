const mysql = require('mysql');

let conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_galeria_video'
});

module.exports = conexao;
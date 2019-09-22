const mysql = require('mysql');

let conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'micheldev',
    database: 'db_galeria_video'
});

module.exports = conexao;
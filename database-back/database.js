const {Pool} = require('pg');

const pool = new Pool (
    {
        host: "localhost",
        user: "tamarabelson", 
        port: 5432,
        database: "lost_pets",
        password: "12345"
    }
);

module.exports = pool;

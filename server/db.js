const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "kimura",
  host: "localhost",
  port: 5432,
  database: "mytodos"
});

module.exports = pool;

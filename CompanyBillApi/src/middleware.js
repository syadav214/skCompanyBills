const mysql = require('mysql');

module.exports = (req, res, next) => {
  req.dbConn = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: process.env.DBNAME
  });
  next();
};

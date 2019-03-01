module.exports = req => {
  const connection = req.dbConn;

  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM t_firmen;', function(err, rows, fields) {
      if (err) {
        connection.end();
        reject(err);
      } else {
        console.log('The solution is: ', rows);
        connection.end();
        resolve(rows);
      }
    });
  });
};

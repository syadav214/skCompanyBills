module.exports = req => {
  const connection = req.dbConn;
  connection.connect();

  let query = 'SELECT project_ID,name,city,country,contactEmail FROM t_firmen';

  if (req.params.id) {
    query += ` WHERE id = ${req.params.id};`;
  }

  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows, fields) => {
      if (err) {
        connection.end();
        reject('Not able to retrive company details');
      } else {
        connection.end();
        resolve(rows);
      }
    });
  });
};

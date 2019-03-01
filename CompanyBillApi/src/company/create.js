module.exports = req => {
  const connection = req.dbConn;
  connection.connect();

  return new Promise((resolve, reject) => {
    const query = `INSERT INTO t_firmen (project_ID,name,city,country,contactEmail) VALUES (${
      req.body.project_ID
    },'${req.body.name}','${req.body.city}','${req.body.country}','${
      req.body.contactEmail
    }');`;
    connection.query(query, (err, rows, fields) => {
      if (err) {
        console.log('err', err);
        connection.end();
        reject('Not able to create company');
      } else {
        connection.end();
        resolve({ affectedRows: rows.affectedRows });
      }
    });
  });
};

module.exports = req => {
  const connection = req.dbConn;
  connection.connect();

  let query =
    'SELECT C.name, B.company_ID,B.date,B.amount,B.billNumber,B.dueDate,B.Komment FROM t_rechnungstermine B JOIN t_firmen C ON B.company_ID = C.id ';

  if (req.params.billNo !== '0') {
    query += ` WHERE B.billNumber = ${req.params.billNo}`;
  } else if (req.params.all === '0') {
    if (req.params.month !== '0' && req.params.year === '0') {
      // single month - all year
      query += ` WHERE MONTH(B.date) = ${req.params.month}`;
    } else if (req.params.month === '0' && req.params.year !== '0') {
      // single year - all month
      query += ` WHERE YEAR(B.date) = ${req.params.year}`;
    } else if (req.params.month !== '0' && req.params.year !== '0') {
      // single month & year
      query += ` WHERE YEAR(B.date) = ${req.params.year} AND MONTH(B.date) = ${
        req.params.month
      } `;
    }
  }

  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows, fields) => {
      if (err) {
        connection.end();
        reject('Not able to retrive bill details');
      } else {
        connection.end();
        resolve(rows);
      }
    });
  });
};

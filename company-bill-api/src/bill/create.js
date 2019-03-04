module.exports = req => {
  const connection = req.dbConn;
  connection.connect();

  return new Promise((resolve, reject) => {
    const query = `INSERT INTO t_rechnungstermine (company_ID,date,amount,billNumber,dueDate,Komment) VALUES (${
      req.body.company_ID
    },'${req.body.date}',${req.body.amount},${
      req.body.billNumber
    },'${req.body.dueDate}','${req.body.comment}');`;
    connection.query(query, (err, rows, fields) => {
      if (err) {
        connection.end();
        reject('Not able to create bill');
      } else {
        connection.end();
        resolve({ affectedRows: rows.affectedRows });
      }
    });
  });
};

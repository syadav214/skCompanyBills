const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const app = express();
// used middleware for db connection
app.use(require('./middleware'));
// routes of the APIs
require('./routes')(app);

app.listen(port, () => {
  console.log('Server listening at port: ', port);
});

let response = { success: true, body: {} };

function internalServerError(err, res) {
  response.body = err;
  response.success = false;
  res.status(500);
  return res;
}

const router = app => {
  app.get('/', (req, res) => {
    response.body = {
      getCompanies: 'GET-> /company',
      getSingleCompany: 'GET-> /company/:id',
      createCompany: 'POST-> /company'
    };
    res.json(response);
  });

  app.get('/company', async (req, res) => {
    try {
      response.body = await require('./company/get')(req);
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });
  
  app.get('/company/:id', async (req, res) => {
    try {
      response.body = await require('./company/get')(req);
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });

  app.post('/company', async (req, res) => {
    try {
      response.body = await require('./company/create')(req);
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });
};

module.exports = router;

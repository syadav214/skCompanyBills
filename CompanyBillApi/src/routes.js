let response = { success: true, body: {} };

const router = app => {
  app.get('/', (req, res) => {
    response.body = {
      getCompanies: 'GET-> /company',
      getSingleCompany: 'GET-> /company/{id}',
      createCompany: 'POST-> /company'
    };
    res.json(response);
  });

  app.get('/company', async (req, res) => {
    try {
      response.body = await require('./company/create')(req);
    } catch (err) {
      response.body = 'Error';
      response.success = false;
      res.status(500);
    }
    res.json(response);
  });
};

module.exports = router;

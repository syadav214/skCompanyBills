const chai = require('chai'),
  supertest = require('supertest'),
  dotenv = require('dotenv'),
  app = require('../src/app');

dotenv.config();

describe('Company Tests', () => {
  it('should get response from the /company route', done => {
    supertest(app)
      .get('/company')
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('should get response from the /bills route', done => {
    supertest(app)
      .get('/bills/0/0/1')
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        const { body } = res.body;
        if (body.length > 0) {
          global.billID = body[0].id; // to be used in FetchBill.js
        }
        done();
      });
  });

  it('should get response from the /bill route', done => {
    supertest(app)
      .get(`/bill/${global.billID}`)
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('should get response from the /year route', done => {
    supertest(app)
      .get('/year')
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        done();
      });
  });
});

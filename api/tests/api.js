let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Testing API', () => {
  // Test the Stats
  it('GET /api/', done => {
    chai
      .request(server)
      .get('/api/')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('msg').equals('Application Running');
        done();
      });
  });
});

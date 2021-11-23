let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Testing API', () => {
  it('GET /api/ Server Running', done => {
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
  it('GET /api/fetchStats Fetching Stats', done => {
    chai
      .request(server)
      .get('/api/fetchStats')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('registeredUsers');
        response.body.should.have.property('votesCasted');
        done();
      });
  });
});

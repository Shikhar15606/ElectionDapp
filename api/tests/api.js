let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('../app');
let server = require('../app');

chai.should();

chai.use(chaiHttp);

describe('Testing API', () => {
  // Test the Stats
  it('Checking whether server is working or not GET/api/', done => {
    chai
      .request(server)
      .get('/api/')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});

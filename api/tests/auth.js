let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Testing Athentication', () => {
  // Test the admin login
  let adminAgent = chai.request.agent(server);
  it('POST /auth/login with correct username/password', done => {
    adminAgent
      .post('/auth/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property('msg').equals('Login Success');
        done();
      });
  });
  // Test the admin login with wrong password
  it('POST /auth/login with incorrect password', done => {
    chai
      .request(server)
      .post('/auth/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: 'Incorrect Password',
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have
          .property('msg')
          .equals('Invalid email/password combination');
        done();
      });
  });
  // Test the admin login with wrong email
  it('POST /auth/login with incorrect username', done => {
    chai
      .request(server)
      .post('/auth/login')
      .send({
        email: 'incorrectemail@gmail.com',
        password: process.env.ADMIN_PASSWORD,
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have
          .property('msg')
          .equals('Invalid email/password combination');
        done();
      });
  });

  it('GET /auth/isAdmin with valid cookie', done => {
    adminAgent.get('/auth/isAdmin').end((err, response) => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('isAdmin').equals(true);
      done();
    });
  });

  it('GET /auth/isAdmin with no cookie', done => {
    chai
      .request(server)
      .get('/auth/isAdmin')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('isAdmin').equals(false);
        done();
      });
  });

  it('GET /auth/logout Logging out admin', done => {
    adminAgent.get('/auth/logout').end((err, response) => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('msg').equals('Logout Success');
      done();
    });
  });

  it('GET /auth/isAdmin with expired cookie', done => {
    adminAgent.get('/auth/isAdmin').end((err, response) => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('isAdmin').equals(false);
      done();
    });
  });
});

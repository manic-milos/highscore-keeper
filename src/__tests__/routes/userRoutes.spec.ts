import { before, describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import setEnvBeforeTests from '../setEnvBeforeTests';

import app from '../../server';
import userModel from '../../server/models/userModel';

chai.should();
chai.use(chaiHttp);
setEnvBeforeTests();

before(async () => {
  // delete everything in users before we start testing
  await userModel.deleteMany({});
});

const user = { userId: '', token: '' };
// TODO comments for what is being tested in assertions
describe('User routes', () => {
  describe('POST /api/user', () => {
    it('should create a user', (done) => {
      chai
        .request(app)
        .post('/api/user')
        .send({
          name: 'test',
          email: 'test@test.com',
          password: 'test',
        })
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          user.userId = res.body._id;
          done();
        })
        .catch((err) => done(err));
    });
    it('should return an error if no name is provided', (done) => {
      chai
        .request(app)
        .post('/api/user')
        .send({
          email: 'test@test.com',
          password: 'test',
        })
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
        .catch((err) => done(err));
    });
    it('should return an error if no email is provided', (done) => {
      chai
        .request(app)
        .post('/api/user')
        .send({
          name: 'test',
          password: 'test',
        })
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
        .catch((err) => done(err));
    });
    it('should return an error if no password is provided', (done) => {
      chai
        .request(app)
        .post('/api/user')
        .send({
          name: 'test',
          email: 'test@test.com',
        })
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
        .catch((err) => done(err));
    });
  });
  describe('POST /api/user/auth', () => {
    it('should login a user', (done) => {
      chai
        .request(app)
        .post('/api/user/auth')
        .send({
          email: 'test@test.com',
          password: 'test',
        })
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          user.token = res.body.token;
          done();
        })
        .catch((err) => done(err));
    });
    it('should return an error if no email is provided', (done) => {
      chai
        .request(app)
        .post('/api/user/auth')
        .send({
          password: 'test',
        })
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
        .catch((err) => done(err));
    });
    it('should return an error if no password is provided', (done) => {
      chai
        .request(app)
        .post('/api/user/auth')
        .send({
          email: 'test@test.com',
        })
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
        .catch((err) => done(err));
    });
  });
});
export { user };
export default chai;

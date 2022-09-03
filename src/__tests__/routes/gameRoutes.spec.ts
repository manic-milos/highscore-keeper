import chai from 'chai';
import chaiHttp from 'chai-http';
import { before, describe, it } from 'mocha';
import setEnvBeforeTests from '../setEnvBeforeTests';
import app from '../../server/index';

import { createUser, IAuthUser } from '../../server/models/userModel';

setEnvBeforeTests();
chai.should();

chai.use(chaiHttp);
const game = { gameId: '' };
let user: IAuthUser | undefined;
before(async () => {
  user = await createUser('game', 'game@login.com', 'login');
});
describe('Game routes', () => {
  describe('GET /api/game', () => {
    it('it should GET all the games', (done) => {
      chai
        .request(app)
        .get('/api/game')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        })
        .catch((err) => done(err));
    });
  });
  it('it should add a game on POST /api/game', (done) => {
    const { token } = user;
    chai
      .request(app)
      .post('/api/game/')
      .send({
        name: 'test',
        description: 'test',
        maxScore: 100,
      })
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        game.gameId = res.body._id;
        done();
      })
      .catch((err) => done(err));
  });
  describe('GET /api/game/:id', () => {
    it('it should not GET a game with a wrong id', (done) => {
      chai
        .request(app)
        .get('/api/game/6301d54f4113395d7c4c6cde')
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
        .catch((err) => done(err));
    });
    it('it should GET a game with a right id', (done) => {
      chai
        .request(app)
        .get(`/api/game/${game.gameId}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
        .catch((err) => done(err));
    });
    it('it should update a game on PUT /api/game/:id', (done) => {
      const { token } = user;
      chai
        .request(app)
        .put(`/api/game/${game.gameId}`)
        .send({
          name: 'test1',
          description: 'test1',
          maxScore: 1001,
        })
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
        .catch((err) => done(err));
    });
  });
});

export default chai;

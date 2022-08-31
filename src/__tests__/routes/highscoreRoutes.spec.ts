import chai from 'chai';
import chaiHttp from 'chai-http';
import { before, describe, it } from 'mocha';
import setEnvBeforeTests from '../setEnvBeforeTests';
import { generateToken } from '../../server/controllers/userController';
import app from '../../server/index';
import gameTests, { game } from './gameRoutes.spec';
import userTests, { user } from './userRoutes.spec';
import highscoreModel from '../../server/models/highscoreModel';

setEnvBeforeTests();
chai.should();
chai.use(chaiHttp);

before(async () => {
  await highscoreModel.deleteMany({});
});

if (userTests && gameTests) {
  describe('Highscore routes', () => {
    describe('GET /api/highscore/:gameId', () => {
      it('should return all highscores for a game', (done) => {
        chai
          .request(app)
          .get(`/api/highscore/${game.gameId}`)
          .then((res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          })
          .catch((err) => done(err));
      });
    });
    describe('POST /api/highscore/:gameId', () => {
      it('should create a highscore', (done) => {
        const token = generateToken(user.userId);
        chai
          .request(app)
          .post(`/api/highscore/${game.gameId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            score: 100,
          })
          .then((res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
          })
          .catch((err) => done(err));
      });
      it('should return an error if no score is provided', (done) => {
        const token = generateToken(user.userId);
        chai
          .request(app)
          .post(`/api/highscore/${game.gameId}`)
          .set('Authorization', `Bearer ${token}`)
          .send()
          .then((res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          })
          .catch((err) => done(err));
      });
      it('should return error if user is not authorized', (done) => {
        chai
          .request(app)
          .post(`/api/highscore/${game.gameId}`)
          .send({
            score: 100,
          })
          .then((res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          })
          .catch((err) => done(err));
      });
    });
  });
}
export default chai;

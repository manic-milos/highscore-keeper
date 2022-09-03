import chai from 'chai';
import chaiHttp from 'chai-http';
import { before, describe, it } from 'mocha';
import setEnvBeforeTests from '../setEnvBeforeTests';
import app from '../../server/index';
import { createUser, IAuthUser } from '../../server/models/userModel';
import { gameCreate } from '../../server/models/gameModel';

setEnvBeforeTests();
chai.should();
chai.use(chaiHttp);

let user: IAuthUser | undefined;
let game: any;
// TODO randomize data
before(async () => {
  user = await createUser('highscore', 'highscore@login.com', 'login');
  game = await gameCreate({
    name: 'highscoreGame', description: 'test', ownerId: user._id, maxScore: 100,
  });
});

describe('Highscore routes', () => {
  describe('GET /api/highscore/:gameId', () => {
    it('should return all highscores for a game', (done) => {
      chai
        .request(app)
        .get(`/api/highscore/${game._id}`)
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
      const { token } = user;
      chai
        .request(app)
        .post(`/api/highscore/${game._id}`)
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
      const { token } = user;
      chai
        .request(app)
        .post(`/api/highscore/${game._id}`)
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
        .post(`/api/highscore/${game._id}`)
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
export default chai;

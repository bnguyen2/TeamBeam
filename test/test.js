const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('request');
const rp = require('request-promise');
const config = process.env.DATABASE_URL ? require('../db/config.heroku.js') : require('../db/config.js'); //Define PostgreSQL environment configuration here
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const models = require('../db/models');
const initFixtures = require('./fixtures')

const PORT = process.env.PORT || 3000;

/*  Make sure that the server is running before starting the tests  */
describe('Sound Connect API:', function() {
  beforeEach(function(done) { //Initialize fixtures
    initFixtures().then(() => done());
  });

  describe('GET /forum', function() {
    it('should return an array of thread objects', function(done) {
      request({
        method: 'GET',
        uri: `http://localhost:${PORT}/forum`
      }, (err, res, body) => {
        body = JSON.parse(body);
        expect(body.length).to.equal(10);
        expect(body[0]).to.be.a('object');
        expect(body[0].title).to.equal("Austin's thread");
        done();
      });
    });
  });

  describe('POST /forum', function() {
    it('should insert a thread into threads table', function(done) {
      rp({
        method: 'POST',
        uri: `http://localhost:${PORT}/forum`,
        json: {
          user_id: 1,
          title: 'A dummy thread made by userId 1',
          description: 'A description for dummy thread made by userId 1',
          instruments: JSON.stringify(['Piano', 'Violin']),
          musicsheet: 'example.jpg'
        }
      })
      .then(() => {
        return models.Thread.query('where', 'title', '=', 'A dummy thread made by userId 1').fetch();
      })
      .then((results) => {
        expect(results.attributes).to.be.a('object');
        expect(results.attributes.user_id).to.be.equal(1);
        expect(results.attributes.description).to.equal('A description for dummy thread made by userId 1');
        done()
      });
    });
  });
});

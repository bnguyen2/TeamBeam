const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('request');
const rp = require('request-promise');
const config = process.env.DATABASE_URL ? require('../db/config.heroku.js') : require('../db/config.js'); //Define PostgreSQL environment configuration here
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const models = require('../db/models')
const PORT = process.env.PORT || 3000;

/*  Make sure that the server is running before starting the tests  */
describe('Sound Connect API:', function() {
  beforeEach(function(done) { //Clean database
    knex('albums').del()
    .then(() => knex('profiles').del())
    .then(() => knex('posts').del())
    .then(() => knex('threads').del())
    .then(() => knex('users').del())
    .then(() => done());
  });

  describe('GET /forum', function() {
    beforeEach(function(done) {
      models.User.forge({ username: 'user 1', password: 'password 1' }).save()
      .then((results) => {
        return models.Thread.forge({
          title: 'title 1',
          description: 'description 1',
          instruments: JSON.stringify(['Piano', 'Drums']),
          musicsheet: 'www.example.com',
          user_id: results.attributes.id
        }).save()
      })
      .then(() => done());
    });
    it('should return an array of thread objects', function(done) {
      request({
        method: 'GET',
        uri: `http://localhost:${PORT}/forum`
      }, (err, res, body) => {
        body = JSON.parse(body);
        expect(body[0]).to.be.a('object');
        expect(body[0].description).to.equal('description 1');
        done();
      });
    });
  });

  describe('POST /forum', function() {
    it('should insert a thread into threads table', function(done) {
      models.User.forge({ username: 'user 1', password: 'password 1' }).save()
      .then((results) => {
        return rp({
          method: 'POST',
          uri: `http://localhost:${PORT}/forum`,
          json: {
            user_id: results.attributes.id,
            title: 'A dummy thread made by userId 1',
            description: 'A description for dummy thread with id 0 made by userId 0',
            instruments: JSON.stringify(['Piano', 'Violin']),
            musicsheet: 'example.jpg'
          }
        });
      })
      .then(() => {
        return models.Thread.query('where', 'title', '=', 'A dummy thread made by userId 1').fetch()
      }, (err) => {
      })
      .then((results) => {
        expect(results.attributes).to.be.a('object');
        expect(results.attributes.description).to.equal('A description for dummy thread with id 0 made by userId 0');
        done()
      })
    });
  });
});

const config = process.env.DATABASE_URL ? require('./config.heroku.js') : require('./config.js'); //Define PostgreSQL configuration here
let knex = require('knex')(config);
let bookshelf = require('bookshelf')(knex);

module.exports.Thread = bookshelf.Model.extend({
  tableName: 'threads'
});

module.exports.Post = bookshelf.Model.extend({
  tableName: 'posts'
});

module.exports.Profile = bookshelf.Model.extend({
  tableName: 'profiles'
});

module.exports.User = bookshelf.Model.extend({
  // return password from database instead of boolean
  tableName: 'users',
  hasTimestamps: true,
  verifyPassword: function(password) {
      return this.get('password') === password;
  }
}, {
  byUsername: function(username) {
      return this.forge().query({where:{ username: username }}).fetch();
  }
});

module.exports.Album = bookshelf.Model.extend({
  tableName: 'albums'
});

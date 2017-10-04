const config = require('./config.js') || require('./config.heroku.js'); //Define PostgreSQL configuration here
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
  tableName: 'users'
});

module.exports.Album = bookshelf.Model.extend({
  tableName: 'albums'
});

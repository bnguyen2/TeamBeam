const config = process.env.DATABASE_URL ? require('./config.heroku.js') : require('./config.js'); //Define PostgreSQL configuration here
let knex = require('knex')(config);
let bookshelf = require('bookshelf')(knex);

/* Define schemas here */
module.exports = function() {
  return new Promise((resolve, reject) => {
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.string('username');
      table.string('password');
      table.timestamps();
    })
    .then((results) => {
      return knex.schema.createTableIfNotExists('threads', function (table) {
        table.increments();
        table.string('title');
        table.text('description');
        table.json('instruments');
        table.string('musicsheet');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
        table.timestamps();
      });
    }, (err) => {
      console.log('Error creating users table', err);
    })
    .then((results) => {
      return knex.schema.createTableIfNotExists('posts', function (table) {
        table.increments();
        table.text('message');
        table.integer('thread_id').unsigned();
        table.foreign('thread_id').references('id').inTable('threads');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
        table.timestamps();
      });
    }, (err) => {
      console.log('Error creating threads table', err);
    })
    .then((results) => {
      return knex.schema.createTableIfNotExists('albums', function (table) {
        table.increments();
        table.string('title');
        table.json('songs');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
      });
    }, (err) => {
      console.log('Error creating posts table', err);
    })
    .then((results) => {
      return knex.schema.createTableIfNotExists('profiles', function (table) {
        table.increments();
        table.json('instruments');
        table.text('bio');
        table.string('picture');
        table.json('discography');
        table.string('profiletype');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
      });
    }, (err) => {
      console.log('Error creating albums table', err);
    })
    .then((results) => {
      return knex.schema.createTableIfNotExists('sessions', function(table) {
        table.string('sid');
        table.json('sess');
        table.timestamp('expired');
      });
    }, (err) => {
      console.log('Error creating profiles table', err);
    })
    .then((results) => {
      resolve();
    }, (err) => {
      console.log('Error creating sessions table', err);
      reject();
    });
  });
};

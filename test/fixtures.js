const config = process.env.DATABASE_URL ? require('../db/config.heroku.js') : require('../db/config.js'); //Define PostgreSQL configuration here
const _ = require('lodash');
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const models = require('../db/models');
const createTables = require('../db/schema');

module.exports = function() {
  /* Drop all tables */
  return new Promise((resolve, reject) => {
    knex.schema.dropTableIfExists('profiles')
    .then(() => knex.schema.dropTableIfExists('albums'))
    .then(() => knex.schema.dropTableIfExists('posts'))
    .then(() => knex.schema.dropTableIfExists('threads'))
    .then(() => knex.schema.dropTableIfExists('users'))
    .then(() => knex.schema.dropTableIfExists('sessions'))
    .then(() => createTables())

    /* Populate database with fixtures */
    .then(() => { //Create users
      return models.User.forge({
        username: 'Austin',
        password: "Austin"
      }, {
        hasTimestamps: true
      }).save();
    })
    .then(() => {
      return _.range(2, 21).reduce((prev, cur, i, arr) => {
        return prev.then(() => {
          return models.User.forge({
            username: `user ${arr[i]}`,
            password: `user ${arr[i]}'s password`
          }, {
            hasTimestamps: true
          }).save();
        });
      }, Promise.resolve());
    })
    .then(() => { //Create profiles where users with id <= 10 are composers
      return models.Profile.forge({
        instruments: JSON.stringify(['Guitar']),
        bio: "Austin's bio",
        picture: 'austin.jpg',
        discography: JSON.stringify(["Austin's first album"]),
        profiletype: 'composer',
        user_id: '1'
      }).save();
    })
    .then(() => {
      return _.range(2, 11).reduce((prev, cur, i, arr) => {
        return prev.then(() => {
          return models.Profile.forge({
            instruments: JSON.stringify(['Bass']),
            bio: `User${arr[i]}'s bio`,
            picture: `User${arr[i]}.jpg`,
            discography: JSON.stringify([`User${arr[i]}'s first album`, `User${arr[i]}'s second album`]),
            profiletype: 'composer',
            user_id: arr[i]
          }).save();
        });
      }, Promise.resolve());
    })
    .then(() => {
      return _.range(11, 21).reduce((prev, cur, i, arr) => {
        return prev.then(() => {
          return models.Profile.forge({
            instruments: JSON.stringify(['Bass']),
            bio: `User${arr[i]}'s bio`,
            picture: `User${arr[i]}.jpg`,
            discography: JSON.stringify([`User${arr[i]}'s first album`, `User${arr[i]}'s second album`]),
            profiletype: 'musician',
            user_id: arr[i]
          }).save();
        });
      }, Promise.resolve());
    })
    .then(() => { //Create threads
      return models.Thread.forge({
        title: "Austin's thread",
        description: "Austin's thread description",
        instruments: JSON.stringify(['Piano']),
        musicsheet: 'https://i.pinimg.com/736x/f8/04/cb/f804cbff9ca51419934b6665c758b977--alto-sax-sheet-music-free-sheet-music.jpg',
        user_id: 1
      }, {
        hasTimestamps: true
      }).save();
    })
    .then(() => {
      return _.range(2, 11).reduce((prev, cur, i, arr) => {
        return prev.then(() => {
          return models.Thread.forge({
            title: `User${arr[i]}'s thread`,
            description: `User${arr[i]}'s thread description`,
            instruments: JSON.stringify(['Guitar', 'Drums']),
            musicsheet: `www.user${arr[i]}_musicsheet.jpg`,
            user_id: arr[i]
          }, {
            hasTimestamps: true
          }).save();
        });
      }, Promise.resolve());
    })
    .then(() => { //Create posts
      return models.Post.forge({
        message: `Evan's message`,
        thread_id: 1,
        user_id: 11,
      }, {
        hasTimestamps: true
      }).save();
    })
    .then(() => {
      return _.range(2, 11).reduce((prev, cur, i, arr) => {
        return prev.then(() => {
          return models.Post.forge({
            message: `User${arr[i]}'s message`,
            thread_id: cur,
            user_id: cur + 10
          }, {
            hasTimestamps: true
          }).save();
        });
      }, Promise.resolve());
    })
    .then(() => { //Create albums
      return _.range(11, 21).reduce((prev, cur, i, arr) => {
        return prev.then(() => {
          return models.Album.forge({
            title: `User${cur}'s album`,
            songs: JSON.stringify([`User${cur}'s album first song`, `User${cur}'s album second song`]),
            user_id: cur
          }).save();
        });
      }, Promise.resolve());
    })
    .then(() => resolve(), () => reject());
  });
};

const config = process.env.DATABASE_URL ? require('../db/config.heroku.js') : require('../db/config.js'); //Define PostgreSQL configuration here
const _ = require('lodash');
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const models = require('../db/models')

/* Drop all tables */
knex.schema.dropTableIfExists('profiles')
.then(() => knex.schema.dropTableIfExists('albums'))
.then(() => knex.schema.dropTableIfExists('posts'))
.then(() => knex.schema.dropTableIfExists('threads'))
.then(() => knex.schema.dropTableIfExists('users'))

/* Create all tables */
.then(() => {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.timestamps();
  });
})
.then((results) => {
  console.log('Success creating users table');
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
  console.log('Sucess creating threads table');
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
  console.log('Sucess creating posts table');
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
  console.log('Sucess creating albums table');
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
  console.log('Sucess creating profiles table');
}, (err) => {
  console.log('Error creating profiles table', err);
})

/* Populate database with fixtures */
.then(() => {
  return models.User.forge({
    username: 'Austin',
    password: "Austin's password"
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
.then(() => {
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
  return models.Thread.forge({
    title: "Austin's thread",
    description: "Austin's thread description",
    instruments: JSON.stringify(['Piano']),
    musicsheet: 'www.austin_musicsheet.jpg',
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


/**Example of saving an object into a table**

let dummyThread = {
  title: 'example title',
  description: 'example description',
  instruments: JSON.stringify(['Piano', 'Drums']),
  musicsheet: 'https://i.pinimg.com/736x/f8/04/cb/f804cbff9ca51419934b6665c758b977--alto-sax-sheet-music-free-sheet-music.jpg',
  user_id: 1,
  created_at: new Date()
}

let Thread = bookshelf.Model.extend({
  tableName: 'threads'
});

User.forge(dummyUser).save()
.then((results) => {
  console.log('sucess save user', results);
}, (err) => {
  console.log('err save user', err);
});
********************************************/

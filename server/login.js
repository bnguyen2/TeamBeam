const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('passport');
const models = require('../db/models.js');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy((username, password, done) => {
  models.User.byUsername(username).then((userObj) => {

    if (userObj === null) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (password !== userObj.get('password')) {
      console.log('wrong password');
      done(null, false, { message: 'Incorrect password.' });
    }
    console.log('good')
    return done(null, userObj.attributes);

  }).catch((err) => {
    console.log(err);
  });

}));

passport.serializeUser(function(user, done) {
  console.log('serializeUser')
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.forge().query({where:{ id: id }}).fetch()
    .then((user) => {
      console.log('deserial', user)
      done(null, user.attributes);
    })
    .catch((err) => {
      done(err, null);
    });
});

module.exports.verify = passport.authenticate('local', {
  successRedirect:'/', failureRedirect: '/login'
});

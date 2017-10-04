const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('passport');
const session = require('express-session');


app.use(express.static('public'));
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Middleware
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Connect all routes to app
app.use('/', routes)


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const pg = require('pg');
const models = require('../db/models.js');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)
const dbConfig = require('../db/config.js');
const Knex = require('knex');
const db = Knex(dbConfig);
const store = new KnexSessionStore({
    knex: db,
    tablename: 'sessions'
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport Middleware
app.use(session({
  secret: 'teambeam',
  resave: false,
  saveUninitialized: false,
  store: store
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Connect all routes to app
app.use('/', routes);

app.use(express.static('public'));
app.use(express.static('dist'));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

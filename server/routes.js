const routes = require('express').Router();
const db = require('../db/config.js')

/* ---------------------------- Handle GET Request ---------------------------- */

routes.get('/', (req, res) => {
  res.send('index')
});

routes.get('/user/:username', (req, res) => {
  let user = req.params.username;
  /* query username from db */

  // db.findUser(user, (data) => {
  //   res.send(data)
  // })

});

routes.get('/login', /* Auth Middleware */ (req, res) => {
  // res.send('login')

});

routes.get('/logout', (req, res) => {
	// res.send('logout')
});

routes.get('/forum', /* Auth Middleware */  (req, res) => {
	// res.send('forum')

});

/* ---------------------------- Handle POST Request ---------------------------- */

routes.post('/login', /* Auth Middleware */ (req, res) => {


});

routes.post('/signup', /* Auth Middleware */ (req, res) => {

});

routes.post('/forum', /* Auth Middleware */ (req, res) => {

});

routes.post('/forum/id/comments', /* Auth Middleware */ (req, res) => {

});

module.exports = routes;

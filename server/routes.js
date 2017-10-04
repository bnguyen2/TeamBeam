const routes = require('express').Router();

/* ---------------------------- Handle GET Request ---------------------------- */

app.get('/', (req, res) => {

  /*
    res.send('index')
    index
  */

});

app.get('/user/:username', (req, res) => {
  let user = req.params.username;
  /* query username from db */


});

app.get('/login', /* Auth Middleware */ (req, res) => {
  // res.send('login')

});

app.get('/logout', (req, res) => {
	// res.send('logout')
});

app.get('/forum', /* Auth Middleware */  (req, res) => {
	// res.send('forum')

});

/* ---------------------------- Handle POST Request ---------------------------- */

app.post('/login', /* Auth Middleware */ (req, res) => {


});

app.post('/signup', /* Auth Middleware */ (req, res) => {

});

app.post('/forum', /* Auth Middleware */ (req, res) => {

});

app.post('/forum/id/comments', /* Auth Middleware */ (req, res) => {

});




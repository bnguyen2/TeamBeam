const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')


app.use(express.static('public'));
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Set up db connection

// const connection = mysql.createConnection({
//   database: database,
//   user: 'root',
//   password: ''
// });

/* ---------------------------- Handle GET Request ---------------------------- */

app.get('/', (req, res) => {

  /*
    res.send('index')
    index
  */

})

app.get('/user/:username', (req, res) => {
  let user = req.params.username;
  /* query username from db */


});

app.get('/login', /* Auth Middleware */, (req, res) => {
  // res.send('login')
});

app.get('/logout', (req, res) => {
	// res.send('logout')
});

app.get('/forum', /* Auth Middleware */ , (req, res) => {
	// res.send('forum')

});

/* ---------------------------- Handle POST Request ---------------------------- */

app.post('/login', /* Auth Middleware */, (req, res) => {

});

app.post('/signup', /* Auth Middleware */, (req, res) => {

});

app.post('/forum', /* Auth Middleware */, (req, res) => {

});

app.post('/forum/id/comments', /* Auth Middleware */, (req, res) => {

});

/* ----------------------------------- Server ----------------------------------- */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});









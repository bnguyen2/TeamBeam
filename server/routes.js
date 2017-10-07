const path = require('path');
const routes = require('express').Router();
const models = require('../db/models');
const login = require('./login');



/* ---------------------------- Handle GET Request ---------------------------- */

routes.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

routes.get('/user/:username', (req, res) => {
  let username = req.params.username; // username endpoint
  let userData = {}
  console.log('get here', username);

  models.User.query('where', 'username', '=', username).fetch()
    .then(userResults => {
      let userId = userResults.attributes.id; // get user id from the user
      userData.user = userResults
      return models.Profile.query('where', 'user_id', '=', userId).fetch()
    })
    .then(profileResults => {
      userData.profile = profileResults
      res.status(200);
      res.send(userData);
    }, (err) => {
      console.log('err username does not exist', err);
      res.status(400);
      res.end();
    })
});

routes.get('/login', /* Auth Middleware */ (req, res) => {
  // res.send('login')

});

routes.get('/logout', (req, res) => {
  // passport attaches a logout method to every req object
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

routes.get('/forum', /* Auth Middleware */  (req, res) => {
  models.Thread.fetchAll()
  .then((results) => {
    let threads = results.models.map((modelBase) => {
      return modelBase.attributes;
    });
    res.status(200);
    res.send(threads);
  }, (err) => {
    console.log('err fetching threads', err);
    res.status(400);
    res.end();
  });
});

routes.get('/forum/:threadId/posts', /* Auth Middleware */  (req, res) => {
  models.Post.query('where', 'thread_id', '=', +req.param('threadId')).fetchAll()
  .then((results) => {
    let posts = results.models.map((modelBase) => {
      return modelBase.attributes;
    });
    res.status(200);
    res.send(posts);
  }, (err) => {
    console.log('err fetching threads', err);
    res.status(400);
    res.end();
  });
});

// route to individual post
routes.get('/forum/:threadId/posts/:postId', /* Auth Middleware */  (req, res) => {
  models.Post.query('where', 'id', '=', req.params.postId).fetch()
  .then((results) => {
    res.status(200);
    res.send(results);
  }, (err) => {
    console.log('err fetching threads', err);
    res.status(400);
    res.end();
  });
});

routes.get('/deserialize', (req, res) => {  //MODIFY LATER not to send password
  console.log('server des', req.user);
  res.send(req.user);
});

/* ---------------------------- Handle POST Request ---------------------------- */

routes.post('/login', login.verify, (req, res) => {
  console.log('loginser', req.user.id);
  res.send({
    id: req.user.id,
    username: req.user.username
  });
});

routes.post('/signup', /* Auth Middleware */ (req, res) => {
  var newUser = req.body.username;
  var newPass = req.body.password;
  //var newEmail = req.body.email; // add email field later
  var profile = req.body.profile;
  var newDate = new Date();

  models.User.forge({username: newUser, password: newPass, created_at: newDate, updated_at: newDate}).save()
  .then((results) => {
    var id = results.get('id');
    models.Profile.forge({user_id: id, profiletype: profile}).save().then((data)=>{
      res.end();
    }).catch((err)=> { throw err; });
  }).catch((err)=> { throw err; });
});

routes.post('/forum', /* Auth Middleware */ (req, res) => {
  console.log(req.body)
  models.Thread.forge(req.body).save()
  .then((results) => {
    res.status(200);
    res.end();
  }, (err) => {
    console.log('error saving a thread', err);
    res.status(400);
    res.end();
  });
});

routes.post('/forum/:threadId/posts', /* Auth Middleware */ (req, res) => {
  //This functino assumes that the request data has user_id property
  req.body.thread_id = +req.param('threadId');
  models.Post.forge(req.body).save()
  .then((results) => {
    res.status(200);
    res.end();
  }, (err) => {
    res.status(400);
    res.end();
  });
});

routes.post('/logout', (req, res) => {
  req.session.destroy(function (err) {
    res.end();
  });
});

/* ---------------------------- Handle DELETE/UPDATE Request ---------------------------- */

routes.delete('/forum/:threadId/posts/:postId', /* Auth Middleware */ (req, res) => {
  models.Post.query('where', 'thread_id', '=', req.params.threadId).fetchAll()
    .then(postResults => {
      return postResults.models.map((modelBase) => { // return a promise, array of posts
        return modelBase.attributes;
      })
    })
    .then(results => {
      // delete the post from results array
      results.forEach((post, index) => {
        if (post.id === req.params.postId) {
          results.splice(index, 1)
        }
      });
      // delete the post from database
      models.Post.query('where', 'id', '=', req.params.postId).fetch()
        .then(post => {
          if (post) {
            post.destroy()
          }
        });
      res.status(200)
      res.send(results)
    }, (err) => {
      res.status(400);
      res.end();
    })
});

module.exports = routes;

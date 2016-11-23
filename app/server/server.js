/**
 *    This file creates our server using express and implements webpack for deployment
 **/

//Added module dependencies
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
<<<<<<< HEAD
=======
var webpack = require('webpack');
var session = require('express-session');
>>>>>>> dev

//instantiate our server with express and webpack for deployment
var app = express();

//requires bodyParser through middleware
app.use(bodyParser.json());

//Serves index page through static middleware
app.use(express.static(path.join(__dirname, '../../app'), {'index': ['index.html']}));

//sets permissive CORS headers to limit server routing to API level per React guidlines
app.use(function setHeaders(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Disable caching
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

<<<<<<< HEAD
var port = process.env.PORT || 3000;
=======
//do we still need this
app.use(session({
  secret: 'secret session',
  resave: false,
  saveUninitialized: true
}));

var port = process.env.PORT || 7000;
>>>>>>> dev

//imports our endpoints
require('./routes.js')(app);

<<<<<<< HEAD
var Users = require('./controllers/userController.js');

Users.makeUser({username: 'test', password: 'test', orgId: 0}, function(user) {
	Users.getUser(user.username, function(user) {
		console.log(user);
	});
});


app.listen(port, function listeningOnPort() {
  console.log('Listening on port ', port)
});

=======
app.listen(port, function listeningOnPort() {
  console.log('Listening on port ', port);
});
>>>>>>> dev

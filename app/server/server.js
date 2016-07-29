//Added module dependencies
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

//instantiate server
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

var port = process.env.PORT || 3000;

require('./routes.js')(app);

var Users = require('./controllers/userController.js');

Users.makeUser({username: 'test', password: 'test', orgId: 0}, function(user) {
	Users.getUser(user.username, function(user) {
		console.log(user);
	});
});


app.listen(port, function listeningOnPort() {
  console.log('Listening on port ', port)
});


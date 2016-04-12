/**
 * Created by CosticaTeodor on 05/04/16.
 */

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var passport    = require('passport');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
//var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');
var restApi     = require('./routes/api');
var restUser    = require('./routes/users');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var passportConfig = require("./config/passport");
passportConfig(passport);

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
//require('./config/passport')(passport);

app.use('/api', function(req, res, next) {
        passport.authenticate('jwt', {session: false}, function(err, user, info) {
            if (err) { res.status(403).json({mesage:"Token could not be authenticated",fullError: err}) } if (user) { return next(); }
            return res.status(403).json({mesage: "Token could not be authenticated", fullError: info});
        })(req, res, next);
});

app.use('/api', restApi);
app.use('/users',restUser);

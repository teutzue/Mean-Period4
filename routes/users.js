var mongoose = require('mongoose');
var config      = require('../config/database');
var User        = require('../app/models/user'); // get the mongoose model
var mongoose = require("mongoose");
var passport = require('./config/passport')(passport);

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

// bundle our routes
var apiRoutes = express.Router();

// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', function(req, res) {
    if (!req.body.name || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

// connect the api routes under /api/*
app.use('/api', apiRoutes);
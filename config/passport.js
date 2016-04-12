/**
 * Created by CosticaTeodor on 05/04/16.
 */

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jwt-simple');

// load up the user model

var User = require('../app/models/user');
var config = require('../config/database'); // get db config file
var jwtConfig = require('../config/jwtConfig').jwtConfig;

module.exports = function(passport) {

    var opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = jwtConfig.secret;
    opts.issuer = jwtConfig.issuer;
    opts.audience = jwtConfig.audience;


    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("PAYLOAD: " + jwt_payload);

        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);// you could choose to return the payload instead
            } else {
                done(null, false, "User found in token not found");
            }
        });
    }));
};
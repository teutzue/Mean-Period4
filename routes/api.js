/**
 * Created by CosticaTeodor on 05/04/16.
 */

var express = require("express");
var router = express.Router();

router.get("/names",function(req, res){
    res.json([{name: "Peter"}, {name: "Kurt"}, {name: "Hanne"}]); //hardcoded values
});

router.get("/hellos",function(req, res){
    res.json([{msg: "Hello World"}, {msg: "Hello all"}, {msg: "Hello guys!"}]); //hardcoded values
});

router.use('/api', function(req, res, next) {
        passport.authenticate('jwt', {session: false}, function(err, user, info) {
            if (err) {
                res.status(403).json({mesage:"Token could not be authenticated",fullError: err}) }
            if (user)
            { return next(); }
            return res.status(403).json({mesage: "Token could not be authenticated", fullError: info});
        })(req, res, next); });


module.exports = router;


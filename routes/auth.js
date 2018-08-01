const express = require('express');
const passport = require('passport');
const User = require('../db/user');
const config = require('../config');
const auth = require('../tools/auth');

const router = express.Router();

// Passport Configuration
require('../tools/auth/local/passport').setup(User, config);

router.post('/local', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        var error = err || info;
        if (error) return res.status(401).json(error);
        if (!user) return res.status(404).json({
            message: 'Something went wrong, please try again.'
        });

        var token = auth.signToken(user._id, user.authorities);
        res.set('Authorization', 'Bearer ' + token);
        res.json({
            user: user,
            token: token
        });
    })(req, res, next)
});

module.exports = router;
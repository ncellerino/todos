const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Users = require('../../../domain/users');

exports.setup = setup;

 function setup(User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password' // this is the virtual field on the model
      },
      (email, password, done) => {
        Users.findByLogin({
          $or: [{
            email: email.toLowerCase()
          }, {
            username: email
          }]
        }).then(user => {
            if (!user) {
                return done(null, false, {
                  message: 'This email is not registered.'
                });
              } else {
                user.authenticate(password, function(err, res) {
                    if (res) {
                        return done(null, user.profile);
                    } else {
                        return done(null, false, {
                          message: 'This password is not correct.'
                        });
                    }                                                          
                  });
              }
        }).catch(err => {
            return done(err)
        });
    }))}
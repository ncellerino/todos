const express = require('express');
const router = express.Router();
const users = require('../domain/users');
const auth = require('../tools/auth');

/* POST create user. */
router.post('/', (req, res, next) => {
  let userData = req.body;

  users.createUser(userData)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      err.status = 400;
      next(err);
    })
});

/* POST Register a new user. */
router.post('/register', (req, res, next) => {
  let newUser = req.body;
  users.createUser(newUser).then(user => {
    let token = auth.signToken(user._id, user.authorities);
    res.set('Authorization', 'Bearer ' + token);

    res.json(201, {
			user: user.profile,
			token: token
		});    
  }).catch(err => {
    err.status = 400;
    next(err);
  })
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  users.getAll()
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      next(err);
    })

});

module.exports = router;

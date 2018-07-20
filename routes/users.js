const express = require('express');
const router = express.Router();
const usersDomain = require('../domain/users');

/* GET users listing. */
router.post('/', (req, res, next) => {
  let userData = req.body;
  
  usersDomain.createUser(userData)
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(400).send(err.message);
        })

});

module.exports = router;

var usersDB = require('../db/user');

exports.createUser = function(userData) {
    return new Promise(function(resolve, reject) {    
        usersDB.saveUser(userData)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            })
    });
};
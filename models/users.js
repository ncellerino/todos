const User = require('../db/user');

exports.createUser = createUser;
exports.getAll = getAll;
exports.findByLogin = findByLogin;

function createUser(userData) {
    return new Promise(function (resolve, reject) {
        User.saveUser(userData)
            .then(user => resolve(user))
            .catch(err => reject(err))
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        User.getAll()
            .then(users => resolve(users))
            .catch(err => reject(err))
    });
}

function findByLogin(login) {
    return new Promise((resolve, reject) => {
        User.findByLogin(login).then(user => resolve(user))
            .catch(err => reject(err))
    });
}
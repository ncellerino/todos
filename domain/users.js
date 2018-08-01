const usersDB = require('../db/user');

exports.createUser = createUser;
exports.getAll = getAll;

function createUser(userData) {
    return new Promise(function (resolve, reject) {
        usersDB.saveUser(userData)
            .then(user => resolve(user))
            .catch(err => reject(err))
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        usersDB.getAll()
            .then(users => resolve(users))
            .catch(err => reject(err))
    });
}

function findByLogin(login) {
    return new Promise((resolve, reject) => {
        usersDB.findByLogin(login).then(user => resolve(user))
            .catch(err => reject(err))
    });
}
const users = require('./users');
const auth = require('./auth');

exports.assignRoutes = (app) => {
    app.use('/auth', auth);
    app.use('/users', users);
}
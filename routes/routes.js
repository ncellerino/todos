const users = require('./users');

exports.assignRoutes = (app) => {
    app.use('/users', users);
}
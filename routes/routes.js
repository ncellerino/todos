const users = require('./users');
const todos = require('./todos');
const auth = require('./auth');

exports.assignRoutes = (app) => {
    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/todos', todos);
}
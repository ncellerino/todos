const Todo = require('../db/todo');

exports.createTodo = createTodo;
exports.getAllByUser = getAllByUser;
exports.getById = getById;
exports.updateTodo = updateTodo;

function createTodo(todoData) {
    return new Promise(function (resolve, reject) {
        Todo.saveTodo(todoData)
            .then(todo => resolve(todo))
            .catch(err => reject(err))
    });
}

function getById(id) {
    return new Promise((resolve, reject) => {
        Todo.findById(id)
            .then(todo => resolve(todo))
            .catch(err => reject(err))
    });
}

function getAllByUser(id) {
    return new Promise((resolve, reject) => {
        Todo.getByUser(id)
            .then(todos => resolve(todos))
            .catch(err => reject(err))
    });
}

function updateTodo(todoData) {
    return new Promise(function (resolve, reject) {
        Todo.updateTodo(todoData)
            .then(todo => resolve(todo))
            .catch(err => reject(err))
    });
}
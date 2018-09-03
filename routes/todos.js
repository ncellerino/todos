const express = require('express');
const router = express.Router();
const todos = require('../domain/todos');
const auth = require('../tools/auth');

/* POST create todo. */
router.post('/', (req, res, next) => {
    let todoData = req.body;

    todos.createTodo(todoData)
        .then(todo => {
            res.status(201).send(todo)
        })
        .catch(err => {
            err.status = 400;
            next(err);
        })
});

/* GET get todo by id. */
router.get('/:id', (req, res, next) => {
    let id = req.params.id;

    todos.getById(id)
        .then(todo => {
            if (todo) res.status(200).send(todo)
            else res.status(404).send("Todo not found");
        })
        .catch(err => {
            err.status = 400;
            next(err);
        })
});

/* PUT update todo. */
router.post('/', (req, res, next) => {
    let todoData = req.body;

    todos.updateTodo(todoData)
        .then(todo => {
            res.status(200).send(todo)
        })
        .catch(err => {
            err.status = 400;
            next(err);
        })
});


module.exports = router;

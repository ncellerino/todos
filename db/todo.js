const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require('../tools/logger');

// Create a Mongoose schema
let TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },      
    completed: Boolean,

    createdDate: {
        type: Date,
        default: Date.now
    },
});

/**
 * static methods
 */
TodoSchema.statics = {
    /**
     * Save todo - Save a new todo in the database
     *
     * @param {Object} todoData
     * @api public
     */
    saveTodo: (todoData) => {
        let todo = new Todo(todoData);
        return new Promise((resolve, reject) => {
            todo.save()
                .then(todo => {
                    logger.debug("Todo saved!");
                    resolve(todo);
                })
                .catch(err => {
                    logger.error("Error saving todo: " + err);
                    reject(err);
                })
        })
    },

    updateTodo: (todoData) => {
        return new Promise((resolve, reject) => {
            Todo.findByIdAndUpdate(todoData._id, { $set: todoData}, { new: true }, function (err, todo) {
                if (err) {                    
                    logger.error("Error updating todo: " + err);
                    reject(err);
                } else {
                    resolve(todo);
                }                
              });
        });        
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            Todo.findOne({
                _id: id
            }, (err, todo) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(todo)
                }
            });
        });
    },    

    /**
     * Get All todos for an user
     *
     * @api public
     */
    getByUser: (id) => {
        return new Promise((resolve, reject) => {
            Todo.find({'user':id, 'completed': false}, (err, todos) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(todos)
                }
            });
        });
    }
}


// Register the schema
let Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;

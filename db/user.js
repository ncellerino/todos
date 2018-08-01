const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require('../tools/logger');
var bcrypt = require('bcrypt');

const authTypes = ['facebook', 'google', 'local'];
const saltRounds = 10;

// Create a Mongoose schema
let UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, 'Username required'],
        validate: {
            isAsync: true,
            validator: (value, respond) => {
                let self = this;
                User.findOne({
                    username: value
                }, (err, user) => {
                    if (err) return respond(false, 'Unable to check for username uniqueness due to database error');
                    if (user) {
                        if (self.id === user.id) return respond(true);
                        return respond(false, 'The specified username address is already in use.');
                    }
                    return respond(true);
                });
            }
        }
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'User email required'],
        unique: true,
        validate: {
            isAsync: true,
            validator: (value, respond) => {
                let self = this;
                User.findOne({
                    email: value
                }, (err, user) => {
                    if (err) return respond(false, 'Unable to check for e-mail uniqueness due to database error');
                    if (user) {
                        if (self.id === user.id) return respond(true);
                        return respond(false, 'The specified email address is already in use.');
                    }
                    return respond(true);
                });
            }
        }
    },
    password: String,
    provider: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    },
    //fields for reseting password
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    resetPassword: {
        type: Boolean,
        default: false
    }
});


// Register the schema
var User = mongoose.model('User', UserSchema);

module.exports.User = User;

// Public profile information
UserSchema
    .virtual('profile')
    .get(() => {
        return {
            'username': this.username,
            'firstName': this.firstName,
            'lastName': this.lastName,
            'email': this.email
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(() => {
        return {
            '_id': this._id,
            'username': this.username,
            'email': this.email
        };
    });

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function (next) {
        var user = this;
        if ((!user.isNew && !user.resetPassword) || user.facebook || user.google) return next();
        bcrypt.hash(user.password, saltRounds, function (err, hash) {
            if (err) {
                next(new Error('Error hashing password'));
            }
            // Store hash in your password DB.
            user.password = hash;
            //reset forgot token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.resetPassword = false;
            next();
        });
    });

/**
 * Save user - Save a new user in the database
 *
 * @param {Object} userData
 * @api public
 */
exports.saveUser = (userData) => {
    let user = new User(userData);
    return new Promise((resolve, reject) => {
        user.save()
            .then(user => {
                logger.debug("User saved!");
                resolve(user);
            })
            .catch(err => {
                logger.error("Error saving user: " + err);
                reject(err);
            })
    })
}
exports.findByLogin = findByLogin;
exports.getAll = getAll;
exports.delete = deleteUser;

function findByLogin(login) {
    return new Promise((resolve, reject) => {
        User.findOne({
            $or: [{
                email: login.toLowerCase()
            }, {
                username: login
            }]
        }, (err, user) => {
            if (err) {
                reject(err)
            } else {
                resolve(user)
            }
        });
    });
}

/**
 * Get All users - Get all the stored users
 *
 * @api public
 */
function getAll() {
    return new Promise((resolve, reject) => {
        User.find({}, '-salt -password', (err, users) => {
            if (err) {
                reject(err)
            } else {
                resolve(users)
            }
        });
    });
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        User.deleteOne({ '_id': id }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        });
    });
}

/**
 * model Methods
 */
UserSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @api public
	 */
    authenticate: function (plainText, cb) {
        bcrypt.compare(plainText, this.password, cb);
    }

}

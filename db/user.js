const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authTypes = ['facebook', 'google', 'local'];

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
        required: true,
        validate: {
            isAsync: true,
            validator: (value, respond) => {               
                let self = this;
                mongoose.models.User.findOne({
                    username: value
                }, (err, user) => {
                    if (err) return respond(false, 'Unable to check for e-mail uniqueness due to database error');
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
                mongoose.models.User.findOne({
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
 * Validations
 */

// Validate empty email
UserSchema
    .path('email')
    .validate((email) => {
        return email.length;
    }, 'Email cannot be blank');

// Register the schema
var User = mongoose.model('User', UserSchema);

exports.User = User;
exports.saveUser = (userData) => {
    let user = new User(userData);
    return new Promise((resolve, reject) => {
        user.save()
            .then(user => {
                console.log("User saved!");
                resolve(user);
            })
            .catch(err => {
                console.log("Error saving user: " + err);
                reject(err);
            })
    })
}
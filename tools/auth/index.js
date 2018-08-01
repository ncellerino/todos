const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports.signToken = signToken;

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
    return jwt.sign({
        _id: id
    }, config.session.secret,
        {
            expiresIn: config.session.expiresIn
        }
    );
}
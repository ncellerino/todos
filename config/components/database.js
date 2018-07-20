const joi = require('joi');

const envVarsSchema = joi.object({
    DB_URI: joi.string(),
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    database: {
        uri: envVars.DB_URI
    }  
}

module.exports = config
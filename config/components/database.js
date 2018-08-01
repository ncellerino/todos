const joi = require('joi');

const envVarsSchema = joi.object({
    DB_URI: joi.string(),    
    DB_POPULATE: joi.boolean().truthy('TRUE').truthy('true').falsy('FALSE').falsy('false').default(false)
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    database: {
        uri: envVars.DB_URI,
        populate: envVars.DB_POPULATE
    }  
}

module.exports = config
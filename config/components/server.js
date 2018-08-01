const joi = require('joi');

const envVarsSchema = joi.object({
  PORT: joi.number().required(),
  SESSION_SECRET: joi.string().required().default('otc-secret'),
  SESSION_EXPIRES_IN: joi.string().required()
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {  
  server: {
    port: envVars.PORT,
    session: {
      secret: envVars.SESSION_SECRET,
      expiresIn: envVars.SESSION_EXPIRES_IN
    }
  }
}

module.exports = config
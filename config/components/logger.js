const joi = require('joi');

const envVarsSchema = joi.object({ 
  MORGAN_LEVEL: joi.string().allow(['dev', 'combined']).default('dev'),
  LOGGER_LEVEL: joi.string().allow(['error', 'warn','info', 'verbose', 'debug', 'silly']).default('info'),
  LOGGER_ENABLED: joi.boolean().truthy('TRUE').truthy('true').falsy('FALSE').falsy('false').default(true)
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = { 
  logger: {
    morganLevel: envVars.MORGAN_LEVEL,
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  }
}

module.exports = config
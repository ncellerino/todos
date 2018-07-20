const common = require('./components/common')
const logger = require('./components/logger')
const server = require('./components/server')
const database = require('./components/database')

module.exports = Object.assign({}, common, logger, server, database)

let createError = require('http-errors');
let express = require('express');
let path = require('path');
const logger = require('./tools/logger');
const http = require('http');
const config = require('./config');
const database = require('./tools/database');

const app = express();
const httpServer = http.createServer(app);

//connect to mongo database
database.connectDatabase();

// Start server
//httpServer.listen(config.server.port, config.ip, function() {
  httpServer.listen(config.server.port, '0.0.0.0',function() {
	  logger.info('CORS-enabled Express server listening on %d, in %s mode', config.server.port, config.env);
});

module.exports = app;
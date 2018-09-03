const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./tools/logger');
const http = require('http');
const config = require('./config');
const database = require('./tools/database');

const app = express();
app.use(cors());
const httpServer = http.createServer(app);

//connect to mongo database
database.connectDatabase();

// Start server
httpServer.listen(config.server.port, '0.0.0.0',function() {
	  logger.info(`CORS-enabled Express server listening on ${config.server.port}, in ${config.env} mode`);
});

module.exports = app;
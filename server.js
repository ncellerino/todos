const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const config = require('./config');

let app = require('./app');

app.use(morgan(config.logger.morganLevel));
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(errorHandler()); // Error handler - has to be last

const routes = require('./routes/routes');
routes.assignRoutes(app);

if(config.database.populate) {
    require('./tools/database/seed');
}

module.exports = app;
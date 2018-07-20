const winston = require('winston');
const path = require('path');

let serverTransports = [];

//error logger
let errorTransport = new winston.transports.File({
    name: 'error-file',
    level: 'error',
    filename: 'server-error-logs.log',
    handleExceptions: true,
    json: false,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    colorize: false
});

//info logger
let infoTransport = new winston.transports.File({
    name: 'info-file',
    level: 'info',
    filename: 'server-info-logs.log',
    handleExceptions: true,
    json: false,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    colorize: false
});

let debugTransport = new winston.transports.File({
    name: 'debug-file',
    level: 'debug',
    filename: 'server-debug-logs.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    colorize: false
});

let consoleTransport = new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
});

serverTransports.push(debugTransport);
serverTransports.push(consoleTransport);
serverTransports.push(infoTransport);
serverTransports.push(errorTransport);

//custom levels
var customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3
    },
    colors: {
        debug: 'blue',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    }
};

let logger = winston.createLogger({
    levels: customLevels.levels,
    transports: serverTransports,
    exitOnError: false    
});

winston.addColors(customLevels.colors);


module.exports = logger;
module.exports.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};
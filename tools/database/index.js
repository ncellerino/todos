const logger = require('../logger');
const mongoose = require('mongoose');
const config = require('../../config');

var currentRetry = 1;

function reconnectDatabase() {
	setTimeout(()=>{
		currentRetry++;
		logger.info(`connecting to mongodb attempt ${currentRetry} ....`);
		connectDatabase();
	}, 1000);
}

mongoose.connection.on('error', function(err) {
	if(err && err.state !== 2) {
		reconnectDatabase(currentRetry);
	}
	console.error('MongoDB connection error: ' + err);			
});

mongoose.connection.on('disconnect', function (err) {
    console.error('MongoDB disconnect', err);
});
mongoose.connection.on('close', function (err) {
	console.error('Error...MongoDB connection lost', err);
	currentRetry = 1;
	reconnectDatabase(currentRetry);
});

mongoose.connection.on('connected', function () {  
	currentRetry = 1;
	logger.debug("mongodb connected....");
	logger.info("using database " + config.database.uri);
});

function connectDatabase() {
    // Connect to database
    logger.debug("connecting to mongodb....");
    mongoose.connect(config.database.uri, { useNewUrlParser: true });
}

module.exports = {connectDatabase};
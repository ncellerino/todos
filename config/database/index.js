import mongoose from "mongoose";
const config = require("../index");
const logger = require("../../tools/logger");

class Connection {
  currentRetry = 1;
  url = config.database.uri || `mongodb://localhost:27017/todos`;
  constructor() {
    logger.info("Establish new connection with url", this.url);
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    this.connectDatabase(this.url);
    mongoose.connection.on("error", err => {
      if (err && err.state !== 2) {
        this.reconnectDatabase(currentRetry);
      }
      console.error("MongoDB connection error: " + err);
    });
  }

  connectDatabase() {
    // Connect to database
    logger.info("stablishing new connection with url....", this.url);
    mongoose.connect(this.url, { useNewUrlParser: true });
  }

  reconnectDatabase() {
    setTimeout(() => {
      currentRetry++;
      logger.info(`connecting to mongodb attempt ${currentRetry} ....`);
      this.connectDatabase();
    }, 1000);
  }
}

export default new Connection();

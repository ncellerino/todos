import mongoose from "mongoose";
import { DB_URI } from "../Environment";
const logger = require("../../tools/logger");

export default class MongoConfig {
  private currentRetry: number = 1;

  constructor() {
    logger.info("Establish new connection with url", DB_URI);
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    //this.connectDatabase();
    mongoose.connection.on("error", err => {
      if (err && err.state !== 2) {
        this.reconnectDatabase();
      }
      console.error("MongoDB connection error: " + err);
    });
  }

  connectDatabase(): void {
    // Connect to database
    logger.info("stablishing new connection with url....", DB_URI);
    mongoose.connect(DB_URI, { useNewUrlParser: true });
  }

  private reconnectDatabase(): void {
    setTimeout(() => {
      this.currentRetry++;
      logger.info(`connecting to mongodb attempt ${this.currentRetry} ....`);
      this.connectDatabase();
    }, 1000);
  }
}

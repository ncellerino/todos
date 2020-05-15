import mongoose from "mongoose";
import { DB_URI } from "../Environment";
import { logger } from "../logger/Logger";

export default class MongoConfig {
  private currentRetry: number = 1;

  constructor() {
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

  async connectDatabase(): Promise<void> {
    // Connect to database
    logger.debug(`stablishing new connection with url....${DB_URI}`);
    let result = await mongoose.connect(DB_URI, { useNewUrlParser: true });
    if (result && result.connections && result.connections.length > 0) {
      if (result.connections[0].readyState === 1) {
        logger.debug(`Connected to mongodb ${DB_URI}`);
      }
    }
  }

  private reconnectDatabase(): void {
    setTimeout(() => {
      this.currentRetry++;
      logger.info(`connecting to mongodb attempt ${this.currentRetry} ....`);
      this.connectDatabase();
    }, 1000);
  }
}

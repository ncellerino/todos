import "reflect-metadata";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/inversify";
import { applyMiddleware } from "./utils/middleware";
import middleware from "./middleware";
import MongoConfig from "./config/database/MongoConfig";

// Create a new express application instance
conectDB();

const server = new InversifyExpressServer(container);
server.setConfig(app => {
  applyMiddleware(middleware, app);
  // setup express middleware logging and error handling
  app.use(function(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    //logger.error(err.stack);
    next(err);
  });

  app.use(function(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.status(500).send("Internal Server Error");
  });
});

let app: express.Application;
app = server.build();
export default app;

async function conectDB() {
  const dbConfig: MongoConfig = new MongoConfig();
  dbConfig.connectDatabase();
}

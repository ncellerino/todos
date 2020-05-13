import "reflect-metadata";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/inversify";
import { applyMiddleware } from "./utils/middleware";
import middleware from "./middleware";

// Create a new express application instance
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

let app = server.build();
export default app;

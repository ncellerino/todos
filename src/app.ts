import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/Inversify/Container';
import { AuthProvider } from './config/Inversify/AuthProvider';
import { applyMiddleware } from './utils/middleware';
import middleware from './middleware/Index';
import errorHandlers from './middleware/ErrorHandlers';
import MongoConfig from './config/database/MongoConfig';

// Create a new express application instance
conectDB();

const server = new InversifyExpressServer(container, null, null, null, AuthProvider);

server.setConfig((router) => {
  applyMiddleware(middleware, router);
  // setup express middleware logging and error handling
  router.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(err);
  });

  router.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send('Internal Server Error');
  });
});

server.setErrorConfig((router) => {
  applyMiddleware(errorHandlers, router);
});

const app: express.Application = server.build();

export default app;

async function conectDB() {
  const dbConfig: MongoConfig = new MongoConfig();
  dbConfig.connectDatabase();
}

import 'reflect-metadata';
import path from 'path';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/Inversify/Container';
import { AuthProvider } from './config/Inversify/AuthProvider';
import { applyMiddleware } from './utils/middleware';
import middleware from './middleware/Index';
import errorHandlers from './middleware/ErrorHandlers';
import MongoConfig from './config/database/MongoConfig';
import { CLIENT_APP_LOCATION, SERVER_ROOT_DIR } from './config/Environment';

// Create a new express application instance
conectDB();

const server = new InversifyExpressServer(container, null, null, null, AuthProvider);

server.setConfig((router) => {
  applyMiddleware(middleware, router);
});

server.setErrorConfig((router) => {
  applyMiddleware(errorHandlers, router);
});

const app: express.Application = server.build();

// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(path.join(SERVER_ROOT_DIR, CLIENT_APP_LOCATION, 'build', 'index.html')));
// });

export default app;

async function conectDB() {
  const dbConfig: MongoConfig = new MongoConfig();
  dbConfig.connectDatabase();
}

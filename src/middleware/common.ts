import express, { Router } from 'express';
import * as path from 'path';
import cors from 'cors';
import parser from 'body-parser';
import compresion from 'compression';
import { CLIENT_APP_LOCATION, SERVER_ROOT_DIR } from '../config/Environment';

export const handleCors = (router: Router) => router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compresion());
};

export const handleStaticFiles = (router: Router) => {
  router.use(express.static(path.join(path.normalize(SERVER_ROOT_DIR + CLIENT_APP_LOCATION), 'build')));
};

export const handleAppRutes = (router: Router) => {
  router.get('/app/*', (req, res) => {
    res.sendFile(path.resolve(path.join(SERVER_ROOT_DIR, CLIENT_APP_LOCATION, 'build', 'index.html')));
  });
};

import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

let filepath;
switch (process.env.NODE_ENV) {
  case 'test':
    filepath = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    filepath = `${__dirname}/../../.env.production`;
    break;
  default:
    filepath = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: filepath });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
export const PORT = process.env.PORT || '9000';
export const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/todos';
export const DB_POPULATE = process.env.DB_POPULATE;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SESSION_EXPIRES_IN = process.env.SESSION_EXPIRES_IN;
export const SERVER_ROOT_DIR = path.normalize(__dirname + '/../../');
export const CLIENT_APP_LOCATION = process.env.CLIENT_APP_LOCATION || "/../react/todos-ui'";

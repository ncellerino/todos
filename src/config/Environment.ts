import dotenv from 'dotenv';

dotenv.config();

let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
export const PORT = process.env.PORT || '9000';
export const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/todos';
export const DB_POPULATE = process.env.DB_POPULATE;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SESSION_EXPIRES_IN = process.env.SESSION_EXPIRES_IN;

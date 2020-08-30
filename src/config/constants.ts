export const PORT = process.env.PORT || 9000;
export const environment = process.env.NODE_ENV || 'dev';

export const db = {
  name: process.env.DB_NAME || 'todos',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '2017',
  user: process.env.DB_USER,
  password: process.env.DB_USER_PWD,
};

export class Constants {
  name: string = process.env.DB_NAME || 'todos';
  host: string = process.env.DB_HOST || 'localhost';
  port: string = process.env.DB_PORT || '2017';
}

//During the test the env variable is set to test
process.env.NODE_ENV = 'development';
process.env.PROCESS_TYPE = "web";
process.env.PORT = 8080;
process.env.DB_URI = "mongodb://localhost:27017/todos";
process.env.SESSION_SECRET = "todos_secret";
process.env.SESSION_EXPIRES_IN = "3h"
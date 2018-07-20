# todos

### How do I get set up? ###

* Summary of set up
* Configuration

##Environment variables
* NODE_ENV ('development' | 'production'): when development, it uses dotenv, to read the local .env file, that's the only difference
* PORT: 
* LOGGER_LEVEL ('error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'), default: info
* LOGGER_ENABLED ('true' | 'false'), default: true
* DB_URI: string to connecto to the database. default:mongodb://localhost:27017/todos  

##Loggers
* morgan: for http requests
* winston: for application logic

##Database
* Mongo

## Dependencies
* joi
* dotenv
* mongoose

* Database configuration
* How to run tests
* Deployment instructions
# todos

### How do I get set up? ###
 ## Local development
 * run npm install
 * npm start

## Run with Docker
* docker run -e "NODE_ENV=development" -e "PROCESS_TYPE=web" -e "PORT=8080" todos

* Summary of set up
* Configuration

##Environment variables
* NODE_ENV ('development' | 'production'): when development, it uses dotenv, to read the local .env file, that's the only difference
* SESSION_SECRET: secret key to sign the json web token.
* PORT: 
* LOGGER_LEVEL ('error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'), default: info
* LOGGER_ENABLED ('true' | 'false'), default: true
* DB_URI: string to connecto to the database. default:mongodb://localhost:27017/todos  
* DB_POPULATE: ('true' | 'false'), default: false

##Loggers
* morgan: for http requests
* winston: for application logic

##Database
* Mongo

## Dependencies
* morgan
* winston
* joi
* dotenv
* mongoose
* passport
* passport-local
* bcrypt
* jsonwebtoken

## Dev Dependencies
* chai
* chai-http: for e2e tests
* mocha
* sinon


* Database configuration
* How to run tests
* Deployment instructions


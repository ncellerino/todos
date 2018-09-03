# Todos REST API 

RESTful API built in Node, Express, Mongoose and MongoDB

## Requirements
- Node, Npm, Docker and MongoDB (for running the server without Docker)

## Installation
- Clone the repo: `git clone https://github.com/ncellerino/todos.git`
- Install dependencies: `npm install`

### Run the server
- Start the server: `node server.js`

### Run server with Docker
* docker run -e "NODE_ENV=development" -e "PROCESS_TYPE=web" -e "PORT=8080" todos

### Run server with Docker Compose
* cd docker
* docker-compose up

## How to run tests

### Run unit tests
* node_modules/mocha/bin/_mocha -u tdd --timeout 999999 --colors test/unit/*/*.spec.js

### Run e2e tests
* node_modules/mocha/bin/_mocha -u tdd --timeout 999999 --colors --require test/e2e/prepare test/e2e/*.js

## Environment variables
* NODE_ENV ('development' | 'production'): when development, it uses dotenv, to read the local .env file, that's the only difference
* SESSION_SECRET: secret key to sign the json web token.
* SESSION_EXPIRES_IN: json web token valid time.
* PORT: the port where the server will listen requests. Default: 9000
* LOGGER_LEVEL ('error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'), default: info
* LOGGER_ENABLED ('true' | 'false'), default: true
* DB_URI: string to connec to to the database. Default: mongodb://localhost:27017/todos  
* DB_POPULATE: ('true' | 'false'), default: false

### Loggers
* morgan: for http requests
* winston: for application logic

### Database
* Mongo

### Dependencies
* joi
* dotenv
* morgan
* winston
* mongoose
* passport
* passport-local
* bcrypt
* jsonwebtoken

### Dev Dependencies
* chai
* chai-http: for e2e tests
* mocha
* sinon

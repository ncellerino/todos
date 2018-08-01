//During the test the env variable is set to test
process.env.NODE_ENV = 'development';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let server = require('../../../../server/app');
let should = chai.should();
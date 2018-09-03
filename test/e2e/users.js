require('./testenv');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../server');
const should = chai.should();

describe('/POST user registration', () => {

    let mail = new Date() + "@mail.com";
    let user = {
        "age": 33,
        "email": mail,
        "password": "3333",
        "firstName": "jorge",
        "lastName": "cellerino"
    }
    it('it should register the new user', (done) => {
        chai.request(server)
            .post('/users/register').send(user)
            .end((err, res, body) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.user.should.be.a('object');
                res.body.user.email.should.be.a('String');
                res.body.user.firstName.should.be.a('String');
                res.body.user.lastName.should.be.a('String');
                should.not.exist(res.body.user.password);
                res.body.token.should.be.a('String');

                done();
            });
    });

    it('register same user - it should return error', (done) => {
        chai.request(server)
            .post('/users/register').send(user)
            .end((err, res, body) => {
                res.should.have.status(400);
               
                done();
            });
    });
});

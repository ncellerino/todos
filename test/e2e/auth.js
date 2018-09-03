require('./testenv');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../server');
const should = chai.should();

describe('/POST user local auth', () => {

    let mail = "admin@admin.com";
    let userLogin = {        
        "email": mail,
        "password": "QKirtIXMt9V8ET6J"        
    }
    it('it should login the user', (done) => {
        chai.request(server)
            .post('/auth/local').send(userLogin)
            .end((err, res, body) => {
                res.should.have.status(200);
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
});

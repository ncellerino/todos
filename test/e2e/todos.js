require('./testenv');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../server');
const should = chai.should();
const mongoose = require('mongoose');

describe('/POST add a new todo', () => {

    let existingTodoId;
    let existingUserId = mongoose.Types.ObjectId().toString();
    let mail = new Date() + "@mail.com";
    let todo = {
        "title": "todo 1",
        "completed": false,
        "user": {"_id": existingUserId}
    };
    it('it should create the new todo', (done) => {
        chai.request(server)
            .post('/todos').send(todo)
            .end((err, res, body) => {
                existingTodoId = res.body._id;
                res.should.have.status(201);     
                res.body.should.be.a('object');            
                res.body.title.should.be.a('String');   
                res.body.title.should.equal(todo.title);        
                res.body.completed.should.equal(todo.completed);  
                res.body.user.should.equal(todo.user._id);  
                done();
            });
    });

    it('obtain an existing todo', (done) => {        
        chai.request(server)
            .get(`/todos/${existingTodoId}`)
            .end((err, res, body) => {
                res.should.have.status(200);
                res.body.should.be.a('object');               
                done();
            });
    });

    it('obtain all existing todos for an user', (done) => {        
        chai.request(server)
            .get(`/users/${existingUserId}/todos`)
            .end((err, res, body) => {
                res.should.have.status(200);
                res.body.should.be.an('array');   
                res.body.length.should.be.equal(1);                         
                done();
            });
    });
});

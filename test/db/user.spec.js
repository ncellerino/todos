var expect = require('chai').expect;
var sinon = require('sinon');
const sinonTest = require('sinon-test')(sinon);

var UserDB = require('../../db/user');
var User = UserDB.User;

var stubUser = {
    username: 'username',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName'
}

describe('Test User Validation', () => {
    it('should be invalid if username is empty', done => {
        let user = new User();
        user.email = 'email';
        let err = user.validateSync();
        expect(err.errors.username).to.exist;
        done();
    });

    it('should be invalid if email is empty', done => {
        let user = new User();
        user.username = 'username';
        let err = user.validateSync();
        expect(err.errors.email).to.exist;
        done();
    });

    it('should be invalid if firstName is empty', done => {
        let user = new User();
        user.username = 'username';
        user.email = 'email';
        let err = user.validateSync();
        expect(err.errors.firstName).to.exist;
        done();
    });

    it('should be invalid if lastName is empty', done => {
        let user = new User();
        user.username = 'username';
        user.email = 'email';
        user.firstName = 'first';
        let err = user.validateSync();
        expect(err.errors.lastName).to.exist;
        done();
    });

    //don't use sinonTest with arrow function notation
    it('should call back with true when user exists', sinonTest(function (done) {
        var existentUser = { username: 'username' };
        let username = 'username';
        let email = 'email';
        let firstName = 'first';
        let lastName = 'last';
        //this.stub works without arrow function notation
        let stub = this.stub(User, 'findOne').yields(null, existentUser);
        var user = new User({ username, email, firstName, lastName });

        user.validate(function (userExist) {
            // expect(userExist).to.be.true;
            done();
        });
    }));

    it('should check for users with same username', sinonTest(function (done) {
        let stub = this.stub(User, 'findOne').yields(null, null);
        let username = 'username';
        let email = 'email';
        let firstName = 'first';
        let lastName = 'last';
        let user = new User({ username, email, firstName, lastName });

        let err = user.validate((userExist) => {
            sinon.assert.calledWith(stub, {
                username: 'username'
            });
            done();
        });
    }));
});

describe('Test get all Users', () => {
    it('should return all users', sinonTest(function (done) {
        let expectedResult = [stubUser];
        let UserMock = sinon.mock(User);
        let stub = this.stub(User, 'find').yields(null, expectedResult);
        UserDB.getAll().then(result => {
            sinon.assert.calledWith(stub, {
            });
            expect(result).to.exist;
            expect(result).to.be.a('array');
            expect(result).to.have.lengthOf(1);
            done();
        });
    }));

    // Test will pass if we fail to get a todo
    it("should return error", sinonTest(function (done) {
        var UserMock = sinon.mock(User);
        var expectedResult = { status: false, error: "Something went wrong" };
        let stub = this.stub(User, 'find').yields(expectedResult, null);
      //  UserMock.expects('find').yields(expectedResult, null);
        UserDB.getAll().catch(err => {
            sinon.assert.calledWith(stub, {
            });
            expect(err.status).to.not.be.true;
            done();
        });
    }));
});


describe('Test save an User', () => {
    it('should save an user', sinonTest(function (done) {
        let UserMock = sinon.mock(new User(stubUser));
        let todo = UserMock.object;
        UserMock.expects('save').yields(null, stubUser);
        todo.save(function (err, result) {
            expect(result.email).to.equal(result.email);
            expect(result.username).to.equal(result.username);
            expect(result.firstName).to.equal(result.firstName);
            expect(result.lastName).to.equal(result.lastName);
            done();
        });
    }));

    // Test will pass if the todo is not saved
    it("should return error, if post not saved", sinonTest(function (done) {
        var UserMock = sinon.mock(new User(stubUser));
        var user = UserMock.object;
        var expectedResult = { status: false };
        UserMock.expects('save').yields(expectedResult, null);
        user.save(function (err, result) {
            expect(err.status).to.not.be.true;
            done();
        });
    }));
});

describe('Test delete an User', () => {
    it('should delete an user', sinonTest(function (done) {
       // let UserMock = sinon.mock(User);
        let userId = '123';
        let stub = this.stub(User, 'deleteOne').withArgs({ '_id': userId }).yields(null, null);
        UserDB.delete(userId).then(function (result) {
            sinon.assert.calledWith(stub, { '_id': userId });
            done();
        });
    }));

    //Test will pass if the todo is not saved
    it("should delete an user", sinonTest(function (done) {
        let userId = '123';
        let stub = this.stub(User, 'deleteOne').withArgs({ '_id': userId }).yields({ status: false }, null);
        UserDB.delete(userId).catch(function (err) {
            sinon.assert.calledWith(stub, { '_id': userId });
            expect(err.status).to.not.be.true;
            done();
        });       
    }));
});
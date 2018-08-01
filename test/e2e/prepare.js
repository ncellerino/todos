require('./testenv');
const prepare = require('mocha-prepare');
const dbUtils = require('../../tools/database/seed');

prepare(function (done) {
    // called before loading of test cases
    dbUtils.populateDb().then(() => {
        done();
    });
}, function (done) {
    // called after all test completes (regardless of errors)
    dbUtils.restoreDb().then(() => {
        done();
    });
});
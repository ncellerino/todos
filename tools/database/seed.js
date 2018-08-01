/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

const User = require('../../db/user');
const mongoose = require('mongoose');
const config = require('../../config');
const logger = require('../logger');

exports.populateDb = populateDb;
exports.restoreDb = restoreDb;

function populateDb() {
    return new Promise((resolve, reject) => {
        // Connect to the db
        // Or using promises
        mongoose.connect(config.database.uri, { useNewUrlParser: true }).then(
            () => {
                User.find({}).remove(function () {
                    User.create({
                        username: 'test',
                        firstName: 'Bruce',
                        lastName: 'Wayne',
                        authorities: ['ROLE_USER'],
                        email: 'test@test.com',
                        password: 'test',
                        createdBy: 'admin',
                        lastModifiedBy: 'admin',
                        activated: true
                    }, {
                            username: 'admin',
                            firstName: 'Clark',
                            lastName: 'kent',
                            authorities: ['ROLE_ADMIN'],
                            email: 'admin@admin.com',
                            password: 'QKirtIXMt9V8ET6J',
                            createdBy: 'admin',
                            lastModifiedBy: 'admin',
                            activated: true
                        }, function () {
                            resolve()
                            logger.info('finished populating users');
                        });
                });
            },
            err => { reject(err) }
        );        
    });
}

function restoreDb() {
    return new Promise((resolve, reject) => {
        // Connect to the db
        mongoose.connect(config.database.uri, { useNewUrlParser: true }).then(()=>{         
            User.find({}).remove(function () {

                resolve()
                logger.info('finished populating users');
            });
        }, err => { reject(err)})            
    });
}


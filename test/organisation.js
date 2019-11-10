const chai = require('chai');
const mongoose = require('mongoose');
const config = require('../config.json');

// To test promises and async functions
chai.use(require('chai-as-promised'));

// To be tested
const create = require('../models/organisation/functions/create');
const update = require('../models/organisation/functions/update');

let organisations = [];

module.exports.test = function () {
    return new Promise((resolve) => {
        describe('Testing organisation functions', async function () {
            before((done) => {
                // Surpress warnings
                process.on('unhandledRejection', () => {
                    console.log('An unhandledRejection occurred');
                });

                // Create database connection 
                mongoose.connect(config.mongo.test, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
                mongoose.connection.once('open', () => {
                    done();
                });
            });

            /**
             * Create
             */

            // positive
            it('create with correct values', async () => {
                let organisation;

                organisation = await create(''.padEnd(1, 'I'));
                chai.expect(organisation).to.haveOwnProperty('isNew').and.to.satisfy(function () {
                    if (organisation.name = ''.padEnd(1, 'I')) {
                        organisations.push(organisation);
                        return true;
                    }

                    return false;
                });

                organisation = await create(''.padEnd(128, 'I'));
                chai.expect(organisation).to.haveOwnProperty('isNew').and.to.satisfy(function () {
                    if (organisation.name = ''.padEnd(128, 'I')) {
                        organisations.push(organisation);
                        return true;
                    }

                    return false;
                });
            });

            // negative
            it('create with wrong values', async () => {
                await chai.expect(create('')).to.be.rejected;
                await chai.expect(create(''.padEnd(128 + 1, 'I'))).to.be.rejectedWith('Valid');
            });

            /**
             * Update
             */

            // positive
            it('update with correct values', async () => {
                let organisation;

                organisation = await update(organisations.pop()._id, ''.padEnd(1, 'J'));
                chai.expect(organisation).to.haveOwnProperty('isNew').and.to.satisfy(function () {
                    if (organisation.name = ''.padEnd(1, 'J')) {
                        organisations.push(organisation);
                        return true;
                    }

                    return false;
                });

                organisation = await update(organisations.pop()._id, ''.padEnd(128, 'I'));
                chai.expect(organisation).to.haveOwnProperty('isNew').and.to.satisfy(function () {
                    if (organisation.name = ''.padEnd(128, 'I')) {
                        organisations.push(organisation);
                        return true;
                    }

                    return false;
                });
            });

            // negative
            it('update with wrong values', async () => {
                await chai.expect(update(organisations[0]._id, '')).to.be.rejected;
                await chai.expect(update(organisations[0]._id, ''.padEnd(128 + 1, 'I'))).to.be.rejected;
            });


            after((done) => {
                done();
                resolve(organisations);
            });
        });
    });
}
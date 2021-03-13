'use strict';

const {expect} = require('../util/chai');
const request = require('supertest');
const truncateTables = require('../util/truncateTables');
const createToken = require('../util/createToken');
const {app, appDependencies} = require('../util/BuildApp');

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

const sampleCustomers = [
  {name: 'Chico', surname: 'Marx'},
  {name: 'Gummo', surname: 'Marx'},
  {name: 'Harpo', surname: 'Marx'},
  {name: 'Groucho', surname: 'Marx'},
  {name: 'Zeppo', surname: 'Marx'}
];

describe('Customer endpoints', function () {

  before(async function () {
    await truncateTables(appDependencies.db)(['accessToken']);
    await createToken(appDependencies)(USER_TOKEN);
    await createToken(appDependencies)(ADMIN_TOKEN, true);
  });

  beforeEach(async function () {
    await truncateTables(appDependencies.db)(['customer']);

    for (let customer of sampleCustomers) {
      await appDependencies.db.Customer.create(customer);
    }
  });

  describe('GET /api/v1/customer/{customerId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      const customerId = 1;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .expect(401, done);
    });

    it('Should return 404 if customer is not found', function (done) {
      request(app)
        .get('/api/v1/customer/100')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 with customer data', function (done) {
      request(app)
        .get('/api/v1/customer/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect('Content-Type', 'application/json')
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(sampleCustomers[0]);
          done();
        });
    });

    it('Should allow admin user to get customer data', function (done) {
      request(app)
        .get('/api/v1/customer/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect('Content-Type', 'application/json')
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(sampleCustomers[0]);
          done();
        });
    });

  });

  describe('PUT /api/v1/customer/{customerId}', function () {

    it('Should return 400 if referenced imageMeta is not found', function (done) {
      const requestBody = {name: 'John', surname: 'Doe', imageMetaId: 99};
      request(app)
        .put('/api/v1/customer/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect(400, (err, res) => {
          expect(res.text).to.be.equal('Invalid imageMeta');
          done();
        });
    });

    it('Should return 401 if client is not authenticated', function (done) {
      const customerId = 1;
      request(app)
        .put(`/api/v1/customer/${customerId}`)
        .send({name: 'John', surname: 'Doe'})
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('Should return 404 if customer is not found', function (done) {
      request(app)
        .put('/api/v1/customer/100')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('Should return 200 if customer is successfully updated', function (done) {
      const requestBody = {name: 'John', surname: 'Doe'};
      request(app)
        .put('/api/v1/customer/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect(202, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(requestBody);
          done();
        });
    });

    it('Should allow admin user to update customer', function (done) {
      const requestBody = {name: 'John', surname: 'Doe'};
      request(app)
        .put('/api/v1/customer/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect(202, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(requestBody);
          done();
        });
    });

  });

  describe('DELETE  /api/v1/customer/{customerId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      const customerId = 1;
      request(app)
        .delete(`/api/v1/customer/${customerId}`)
        .expect(401, done);
    });

    it('Should return 404 if customer is not found', function (done) {
      request(app)
        .delete('/api/v1/customer/100')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 if customer is successfully delete', function (done) {
      request(app)
        .delete('/api/v1/customer/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(200, done);
    });

    it('Should allow admin user to delete customer', function (done) {
      request(app)
        .delete('/api/v1/customer/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, done);
    });

  });

  describe('GET /api/v1/customer', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .get('/api/v1/customer')
        .expect(401, done);
    });

    it('Should return 200 with the list of stored customers', function (done) {
      request(app)
        .get('/api/v1/customer')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual({
            count: 5,
            rows: sampleCustomers
          });
          done();
        });
    });

    it('Should allow admin user to list stored customers', function (done) {
      request(app)
        .get('/api/v1/customer')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual({
            count: 5,
            rows: sampleCustomers
          });
          done();
        });
    });

  });

  describe('POST /api/v1/customer', function () {

    it('Should return 400 if referenced imageMeta is not found', function (done) {
      request(app)
        .post('/api/v1/customer')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'John', surname: 'Doe', imageMetaId: 9})
        .expect(400, (err, res) => {
          expect(res.text).to.be.equal('Invalid imageMeta');
          done();
        });
    });

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .post('/api/v1/customer')
        .expect(401, done);
    });

    it('Should return 200 with stored customer data', function (done) {
      const requestBody = {name: 'John', surname: 'Doe'};
      request(app)
        .post('/api/v1/customer')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send(requestBody)
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(requestBody);
          done();
        });
    });

    it('Should allow admin user to create customers', function (done) {
      const requestBody = {name: 'John', surname: 'Doe'};
      request(app)
        .post('/api/v1/customer')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send(requestBody)
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(requestBody);
          done();
        });
    });

  });

});


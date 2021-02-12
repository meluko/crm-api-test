'use strict';

const {expect} = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const BuildApp = require('../util/BuildApp');
const CustomerController = require('../../src/Controllers/CustomerController');
const CustomerRoutes = require('../../src/Routes/customer');

const services = {customerService: {}};
const controllers = {customerController: CustomerController({services})};

const app = BuildApp(services, controllers, CustomerRoutes);

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

const customer = {
  id: 1,
  name: 'John',
  surname: 'Doe'
};

const customerList = [
  {id: 1, name: 'John', surname: 'Doe'},
  {id: 2, name: 'Jane', surname: 'Doe'}
];

describe('Customer endpoints', function () {

  describe('GET /api/v1/customer/{customerId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      const customerId = 1;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .expect(401, done);
    });

    it('Should return 404 if customer is not found', function (done) {
      services.customerService.get = () => null;
      request(app)
        .get('/api/v1/customer/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 with customer data', function (done) {
      services.customerService.get = () => customer;
      request(app)
        .get('/api/v1/customer/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect('Content-Type', 'application/json')
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal(customer);
          done();
        });
    });

    it('Should allow admin user to get customer data', function (done) {
      services.customerService.get = () => customer;
      request(app)
        .get('/api/v1/customer/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect('Content-Type', 'application/json')
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal(customer);
          done();
        });
    });

  });

  describe('PUT /api/v1/customer/{customerId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      const customerId = 1;
      request(app)
        .put(`/api/v1/customer/${customerId}`)
        .send({name: 'John', surname: 'Doe'})
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('Should return 404 if customer is not found', function (done) {
      services.customerService.get = () => null;
      request(app)
        .put('/api/v1/customer/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('Should return 200 if customer is successfully updated', function (done) {
      services.customerService.get = () => customer;
      services.customerService.update = sinon.stub().returns(customer);
      const customerId = 2771;
      const requestBody = {name: 'John', surname: 'Doe'};
      request(app)
        .put(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect(202, (err, res) => {
          expect(res.body).to.be.deep.equal(customer);
          expect(services.customerService.update.callCount).to.be.equal(1);
          expect(services.customerService.update.getCall(0).args[0]).to.be.equal(customerId);
          expect(services.customerService.update.getCall(0).args[1]).to.be.deep.equal(requestBody);
          done();
        });
    });

    it('Should allow admin user to update customer', function (done) {

      services.customerService.get = () => customer;
      request(app)
        .put('/api/v1/customer/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .set('Accept', 'application/json')
        .expect(202, (err, res) => {
          expect(res.body).to.be.deep.equal(customer);
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
      services.customerService.get = () => null;
      request(app)
        .delete('/api/v1/customer/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 if customer is successfully delete', function (done) {
      services.customerService.get = () => customer;
      services.customerService.remove = sinon.stub();
      const customerId = 2771;
      request(app)
        .delete(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(200, () => {
          expect(services.customerService.remove.callCount).to.be.deep.equal(1);
          expect(services.customerService.remove.getCall(0).args[0]).to.be.deep.equal(customerId);
          done();
        });
    });

    it('Should allow admin user to delete customer', function (done) {
      services.customerService.get = () => customer;
      services.customerService.remove = sinon.stub();
      const customerId = 2771;
      request(app)
        .delete(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, () => {
          expect(services.customerService.remove.callCount).to.be.deep.equal(1);
          expect(services.customerService.remove.getCall(0).args[0]).to.be.deep.equal(customerId);
          done();
        });
    });

  });

  describe('GET /api/v1/customer', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .get('/api/v1/customer')
        .expect(401, done);
    });

    it('Should return 200 with the list of stored customers', function (done) {
      services.customerService.find = () => customerList;
      request(app)
        .get('/api/v1/customer')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            count: 2,
            rows: customerList
          });
          done();
        });
    });

    it('Should allow admin user to list stored customers', function (done) {
      services.customerService.find = () => customerList;
      request(app)
        .get('/api/v1/customer')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            count: 2,
            rows: customerList
          });
          done();
        });
    });

  });

  describe('POST /api/v1/customer', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .post('/api/v1/customer')
        .expect(401, done);
    });

    it('Should return 200 with stored customer data', function (done) {
      services.customerService.create = () => customer;
      request(app)
        .post('/api/v1/customer')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal(customer);
          done();
        });
    });

    it('Should allow admin user to create customers', function (done) {
      services.customerService.create = () => customer;
      request(app)
        .post('/api/v1/customer')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal(customer);
          done();
        });
    });

  });

});


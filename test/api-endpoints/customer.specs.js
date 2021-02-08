'use strict';

const {expect} = require('chai');
const request = require('supertest');

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

describe('Customer endpoints', function () {

  describe('GET /api/v1/customer/{customerId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      const customerId = 1;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .expect(401, done);
    });

    it('Should return 404 if customer is not found', function (done) {
      const customerId = 100;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 with user data', function (done) {
      const customerId = 1;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('Should allow admin user to get customer data', function (done) {
      const customerId = 1;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
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
      const customerId = 100;
      request(app)
        .put(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('Should return 200 if customer is successfully updated', function (done) {
      const customerId = 1;
      request(app)
        .put(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .set('Accept', 'application/json')
        .expect(202, (err, res) => {
          expect(res.body).to.be.deep.equal({
            id: 1,
            name: 'John',
            surname: 'Doe'
          });
          done();
        });
    });

    it('Should allow admin user to update customer', function (done) {
      const customerId = 1;
      request(app)
        .put(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .set('Accept', 'application/json')
        .expect(202, done);
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
      const customerId = 100;
      request(app)
        .delete(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 if customer is successfully delete', function (done) {
      const customerId = 1;
      request(app)
        .delete(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(200, done);
    });

    it('Should allow admin user to delete customer', function (done) {
      const customerId = 1;
      request(app)
        .delete(`/api/v1/customer/${customerId}`)
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
          expect(res.body).to.be.deep.equal(
            {
              'count': 2,
              'rows': [
                {
                  name: 'John',
                  surname: 'Doe'
                },
                {
                  name: 'Jane',
                  surname: 'Doe'
                }
              ]
            }
          );
          done();
        });
    });

    it('Should allow admin user to list stored customers', function (done) {
      request(app)
        .get('/api/v1/customer')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, done);
    });

  });

  describe('POST /api/v1/customer', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .post('/api/v1/customer')
        .expect(401, done);
    });

    it('Should return 200 with the list of stored customers', function (done) {
      request(app)
        .post('/api/v1/customer')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            id: 1,
            name: 'John',
            surname: 'Doe'
          });
          done();
        });
    });

    it('Should allow admin user to list stored customers', function (done) {
      request(app)
        .post('/api/v1/customer')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'John', surname: 'Doe'})
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            id: 1,
            name: 'John',
            surname: 'Doe'
          });
          done();
        });
    });

  });

});


'use strict';

const request = require('supertest');
const app = require('./mock-app');


const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

const resultHandler = (resolve, reject) => (err, res) => {
  if (err) return reject(err.message);
  resolve(res);
};

const multiRequest = (options, request) => {
  return Promise.all(options.map(option => {
    return new Promise((...args) => request(option, resultHandler(...args)))
  }))
};

describe('Customer endpoints', function () {

  describe('GET /api/v1/customer/{customerId}', function () {

    it('Should return 400 if customerId has wrong format', async function () {
      const badFormattedCustomerId = [
        -1,           // Negative integer
        0.25,         // non-intenger number
        99999999999,  // big integer
        "stringId"    // non number
      ];
      await multiRequest(badFormattedCustomerId, ( option, handler) => {
        request(app)
          .get(`/api/v1/customer/${option}`)
          .set('Authorization', `Bearer ${USER_TOKEN}`)
          .expect(400, handler)
      })
    });

    it('Should return 401 if client is not authenticated', function (done) {
      const customerId = 100;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .expect(401, done)
    });

    it('Should return 404 if customer is not found', function (done) {
      const customerId = 100;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done)
    });

    it('Should return 200 with user data', function (done) {
      const customerId = 100;
      request(app)
        .get(`/api/v1/customer/${customerId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
    });

  });

});


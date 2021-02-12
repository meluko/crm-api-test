'use strict';

const {expect} = require('chai');
const request = require('supertest');

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

describe('User endpoints', function () {

  describe('GET ​/api​/v1​/user​/{userId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      const userId = 1;
      request(app)
        .get(`/api/v1/user/${userId}`)
        .expect(401, done);
    });

    it('should return 403 if client is not and admin user', function(done) {
      const userId = 1;
      request(app)
        .get(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      const userId = 100;
      request(app)
        .get(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 with user data', function (done) {
      const userId = 1;
      request(app)
        .get(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, done);
    });

  });

  describe('PUT ​/api​/v1​/user​/{userId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      const userId = 1;
      request(app)
        .put(`/api/v1/user/${userId}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('Should return 403 if client is not an admin user', function (done) {
      const userId = 1;
      request(app)
        .put(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      const userId = 100;
      request(app)
        .put(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('Should return 202 with updated user data', function (done) {
      const userId = 1;
      request(app)
        .put(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(202, (err, res) => {
          expect(res.body).to.be.deep.equal({
            id: 1,
            name: 'Alice',
            surname: 'Wondergirl'
          });
          done();
        });
    });

  });

  describe('DELETE ​/api​/v1​/user​/{userId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      const userId = 1;
      request(app)
        .delete(`/api/v1/user/${userId}`)
        .expect(401, done);
    });

    it('Should return 403 if client is not an admin user', function (done) {
      const userId = 1;
      request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      const userId = 100;
      request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 if user is successfully delete', function (done) {
      const userId = 1;
      request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, done);
    });

  });

  describe('GET ​/api​/v1​/user', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .get('/api/v1/user')
        .expect(401, done);
    });

    it('Should return 403 if client is not an admin user', function (done) {
      request(app)
        .get('/api/v1/user')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(403, done);
    });

    it('Should return 200 with the list of stored users', function (done) {
      request(app)
        .get('/api/v1/user')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal(
            {
              'count': 2,
              'rows': [
                {
                  name: 'Alice',
                  surname: 'Wondergirl'
                },
                {
                  name: 'Bob',
                  surname: 'Squarepants'
                }
              ]
            }
          );
          done();
        });
    });

  });

  describe('POST ​/api​/v1​/user', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .post('/api/v1/user')
        .send({name: 'Alice', surname: 'Wondergirl'})
        .expect(401, done);
    });

    it('Should return 403 if client is not and admin user', function (done) {
      request(app)
        .post('/api/v1/user')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .expect(403, done);
    });

    it('Should return 200 with the stored user data', function (done) {
      request(app)
        .post('/api/v1/user')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            id: 1,
            name: 'Alice',
            surname: 'Wondergirl'
          });
          done();
        });
    });

  });

});








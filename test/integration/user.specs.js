'use strict';

const {expect} = require('../util/chai');
const request = require('supertest');
const truncateTables = require('../util/truncateTables');
const createToken = require('../util/createToken');
const {app, appDependencies} = require('../util/BuildApp');

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

const sampleUsers = [
  {name: 'Rachel', surname: 'Green'},
  {name: 'Monica', surname: 'Geller'},
  {name: 'Phoebe', surname: 'Buffay'},
  {name: 'Joseph', surname: 'Tribbiani', githubId: 3244, githubLogin: 'Joey'},
  {name: 'Chandler', surname: 'Bing'},
  {name: 'Ross', surname: 'Geller'}
];

describe('User endpoints', function () {

  beforeEach(async function () {
    await truncateTables(appDependencies.db)(['accessToken']);
    await truncateTables(appDependencies.db)(['user']);

    for (let user of sampleUsers) {
      await appDependencies.db.User.create(user);
    }

    await createToken(appDependencies)(USER_TOKEN);
    await createToken(appDependencies)(ADMIN_TOKEN, true);
  });

  describe('GET ​/api​/v1​/user​/{userId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .get('/api/v1/user/1')
        .expect(401, done);
    });

    it('should return 403 if client is not and admin user', function (done) {
      request(app)
        .get('/api/v1/user/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      request(app)
        .get('/api/v1/user/100')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 with user data', function (done) {
      request(app)
        .get('/api/v1/user/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(sampleUsers[0]);
          done();
        });
    });

  });

  describe('PUT ​/api​/v1​/user​/{userId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .put('/api/v1/user/1')
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('Should return 403 if client is not an admin user', function (done) {
      request(app)
        .put('/api/v1/user/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      request(app)
        .put('/api/v1/user/100')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('Should return 202 with updated user data', function (done) {
      const requestBody = {name: 'Alice', surname: 'Wondergirl'};
      request(app)
        .put('/api/v1/user/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect(202, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(requestBody);
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
      request(app)
        .delete('/api/v1/user/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      request(app)
        .delete('/api/v1/user/100')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 if user is successfully delete', function (done) {
      request(app)
        .delete('/api/v1/user/1')
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
          expect(res.body).to.be.shallowDeepEqual({
            rows: sampleUsers,
            count: 8
          });
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
      const requestBody = {name: 'Alice', surname: 'Wondergirl'};
      request(app)
        .post('/api/v1/user')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send(requestBody)
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual(requestBody);
          done();
        });
    });

  });

});








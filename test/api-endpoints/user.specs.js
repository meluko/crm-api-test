'use strict';

const {expect} = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const BuildApp = require('../util/BuildApp');
const UserController = require('../../src/Controllers/UserController');
const UserRoutes = require('../../src/Routes/user');

const services = {
  userService: {},
  authService: {}
};
const controllers = {userController: UserController({services})};

const app = BuildApp({services, controllers, routes: UserRoutes});

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

const user = {
  id: 1,
  name: 'Alice',
  surname: 'Wondergirl'
};

const userList = [
  {id: 1, name: 'Alice', surname: 'Wondergirl'},
  {id: 2, name: 'Bob', surname: 'Squarepants'}
];

describe('User endpoints', function () {

  beforeEach(function() {
    services.authService.get = () => 'token';
    services.authService.isValidToken = () => true;
    services.authService.isAdminToken = () => true;
    services.authService.tokenHasRoles = token => ADMIN_TOKEN === token;
  });

  describe('GET ​/api​/v1​/user​/{userId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .get('/api/v1/user/1')
        .expect(401, done);
    });

    it('should return 403 if client is not and admin user', function (done) {
      services.authService.isAdminToken = () => false;
      request(app)
        .get('/api/v1/user/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      services.userService.get = () => null;
      request(app)
        .get('/api/v1/user/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 with user data', function (done) {
      services.userService.get = () => user;
      request(app)
        .get('/api/v1/user/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal(user);
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
      services.authService.isAdminToken = () => false;
      request(app)
        .put('/api/v1/user/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      services.userService.get = () => null;
      request(app)
        .put('/api/v1/user/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('Should return 202 with updated user data', function (done) {
      services.userService.get = () => user;
      services.userService.update = sinon.stub().returns(user);
      const userId = 9325;
      const requestBody = {name: 'Alice', surname: 'Wondergirl'};
      request(app)
        .put(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect(202, (err, res) => {
          expect(res.body).to.be.deep.equal(user);
          expect(services.userService.update.callCount).to.be.equal(1);
          expect(services.userService.update.getCall(0).args[0]).to.be.equal(user);
          expect(services.userService.update.getCall(0).args[1]).to.be.deep.equal({
            ...requestBody,
            isAdmin: false
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
      services.authService.isAdminToken = () => false;
      const userId = 1;
      request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(403, done);
    });

    it('Should return 404 if user is not found', function (done) {
      services.userService.get = () => null;
      request(app)
        .delete('/api/v1/user/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(404, done);
    });

    it('Should return 200 if user is successfully delete', function (done) {
      services.userService.get = () => user;
      services.userService.destroy = sinon.stub();
      const userId = 9325;
      request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, () => {
          expect(services.userService.destroy.callCount).to.be.deep.equal(1);
          expect(services.userService.destroy.getCall(0).args[0]).to.be.deep.equal(userId);
          done();
        });
    });

  });

  describe('GET ​/api​/v1​/user', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .get('/api/v1/user')
        .expect(401, done);
    });

    it('Should return 403 if client is not an admin user', function (done) {
      services.authService.isAdminToken = () => false;
      request(app)
        .get('/api/v1/user')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(403, done);
    });

    it('Should return 200 with the list of stored users', function (done) {
      services.userService.find = () => ({
        count: userList.length,
        rows: userList
      });
      request(app)
        .get('/api/v1/user')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            rows: userList,
            count: 2
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
      services.authService.isAdminToken = () => false;
      request(app)
        .post('/api/v1/user')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .expect(403, done);
    });

    it('Should return 200 with the stored user data', function (done) {
      services.userService.create = () => user;
      request(app)
        .post('/api/v1/user')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .send({name: 'Alice', surname: 'Wondergirl'})
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal(user);
          done();
        });
    });

  });

});








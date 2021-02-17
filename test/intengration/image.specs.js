'use strict';

const {expect} = require('../util/chai');
const request = require('supertest');
const {join} = require('path');
const {app, appDependencies} = require('../util/BuildApp');
const truncateTables = require('../util/truncateTables');
const createToken = require('../util/createToken');

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

describe('Image endpoints', function () {

  before(async function () {
    await truncateTables(appDependencies.db)(['accessToken']);
    await createToken(appDependencies)(USER_TOKEN);
    await createToken(appDependencies)(ADMIN_TOKEN, true);
  });

  beforeEach(async function () {
    await truncateTables(appDependencies.db)(['imageMeta']);
    const path = join(__dirname, '../assets/picture.png');
    await appDependencies.db.ImageMeta.create({path});
  });

  describe('GET /api/v1/image/{imageId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .get('/api/v1/image/{imageId}')
        .expect(401, done);
    });

    it('Should return 404 if image is not found', function (done) {
      request(app)
        .get('/api/v1/image/100')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done);
    });

    it('Should return uploaded image', function (done) {
      request(app)
        .get('/api/v1/image/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(200, done);
    });

    it('Should allow admin user to download images', function (done) {
      request(app)
        .get('/api/v1/image/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, done);
    });

  });

  describe('POST /api/v1/image', function () {

    it('Should return 400 if file is not an image', function (done) {
      request(app)
        .post('/api/v1/image')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .attach('file', __filename)
        .expect(400, done);
    });

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .post('/api/v1/image')
        .expect(401, done);
    });

    it('Should return 200 with uploaded imageMeta data', function (done) {
      request(app)
        .post('/api/v1/image')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .attach('file', join(__dirname, '../assets/picture.png'))
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual({id: 2});
          done();
        });
    });

    it('Should allow admin user to upload imageMetas', function (done) {
      request(app)
        .post('/api/v1/image')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .attach('file', join(__dirname, '../assets/picture.png'))
        .expect(200, (err, res) => {
          expect(res.body).to.be.shallowDeepEqual({id: 2});
          done();
        });
    });

  });

});

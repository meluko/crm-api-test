'use strict';

const {expect} = require('chai');
const request = require('supertest');
const BuildApp = require('./BuildApp');
const ImageController = require('../../src/Controllers/ImageController');
const ImageRoutes = require('../../src/Routes/image');

const services = {
  imageMetaService: {},
  imageService: {}
};
const controllers = {
  imageController: ImageController({services})
};

const app = BuildApp(services, controllers, ImageRoutes);

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

describe('Image endpoints', function () {

  describe('GET /api/v1/image/{imageId}', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .get('/api/v1/image/{imageId}')
        .expect(401, done);
    });

    it('Should return 404 if image is not found', function (done) {
      services.imageMetaService.get = () => null;
      request(app)
        .get('/api/v1/image/{imageId}')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(404, done);
    });

    it('Should return uploaded image', function (done) {
      services.imageMetaService.get = () => ({id: 1, path: 'uploads/0001.png'});
      request(app)
        .get('/api/v1/image/1')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .expect(200, done);
    });

    it('Should allow admin user to download images', function (done) {
      services.imageMetaService.get = () => ({id: 1, path: 'uploads/0001.png'});
      request(app)
        .get('/api/v1/image/1')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .expect(200, done);
    });

  });

  describe('POST /api/v1/image', function () {

    it('Should return 401 if client is not authenticated', function (done) {
      request(app)
        .post('/api/v1/image')
        .expect(401, done);
    });

    it('Should return 200 with uploaded imageMeta data', function (done) {
      const targetFileName = 'uploads/0001.png';
      services.imageService.saveImage = () => targetFileName;
      services.imageMetaService.create = ({path}) => ({id: 1, path});
      request(app)
        .post('/api/v1/image')
        .set('Authorization', `Bearer ${USER_TOKEN}`)
        .attach('file', `${__dirname}/picture.png`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({id: 1, path: targetFileName});
          done();
        });
    });

    it('Should allow admin user to upload imageMetas', function (done) {
      const targetFileName = 'uploads/0001.png';
      services.imageService.saveImage = () => targetFileName;
      services.imageMetaService.create = ({path}) => ({id: 1, path});
      request(app)
        .post('/api/v1/image')
        .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
        .attach('file', `${__dirname}/picture.png`)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({id: 1, path: targetFileName});
          done();
        });
    });

  });

});

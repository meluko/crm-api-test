'use strict';

const multer = require('multer');

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

module.exports = dependencies => app => {
  const {
    validateToken,
  } = dependencies.middlewares;
  const imageController = dependencies.controllers.imageController;

  const upload = multer({
    dest: '/tmp'
  });

  app.get(
    '/api/v1/image/:imageId',
    validateToken([USER_TOKEN, ADMIN_TOKEN]),
    imageController.get
  );

  app.post(
    '/api/v1/image',
    upload.single('file'),
    validateToken([USER_TOKEN, ADMIN_TOKEN]),
    imageController.create
  );

};

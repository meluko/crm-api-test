'use strict';

const multer = require('multer');

module.exports = dependencies => app => {
  const {

  } = dependencies.middlewares;
  const imageController = dependencies.controllers.imageController;

  const upload = multer({
    dest: '/tmp'
  });

  app.get(
    '/api/v1/image/:imageId',
    imageController.get
  );

  app.post(
    '/api/v1/image',
    upload.single('file'),
    imageController.create
  );

};

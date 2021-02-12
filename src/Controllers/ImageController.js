'use strict';

const path = require('path');

module.exports = function (dependencies) {
  const {
    imageService,
    imageMetaService
  } = dependencies.services;

  const get = function(req, res) {
    const {imageId} = req.params;
    const imageMeta = imageMetaService.get(imageId);
    if (!imageMeta) {
      return res.status(404).send('Not Found');
    }
    res.sendFile(path.join(__dirname, '../../test/api-endpoints/picture.png'));
  };

  const create = function (req, res) {
    const tempPath = req.file.path;
    const path = imageService.saveImage(tempPath);
    const imageMeta = imageMetaService.create({path});
    res.status(200).json(imageMeta);
  };

  return {
    get,
    create
  };

};

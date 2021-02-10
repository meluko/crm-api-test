'use strict';

module.exports = function (dependencies) {
  const {
    imageService,
    imageMetaService
  } = dependencies.services;

  const get = async function (req, res) {
    const {imageId} = req.params;
    const imageMeta = await imageMetaService.get(imageId);
    if (!imageMeta) {
      return res.status(404).send('Not Found');
    }
    res.sendFile(imageMeta.path);
  };

  const create = async function (req, res) {
    const {file} = req;
    const [, fileType, extension] = file.mimetype.match(/(.+)\/(.+)/);
    if (fileType !== 'image') {
      return res.status(400).send('Not an image');
    }

    const path = imageService.saveImage(file.path, extension);
    const imageMeta = await imageMetaService.create({path});
    res.status(200).json(imageMeta);
  };

  return {
    get,
    create
  };

};

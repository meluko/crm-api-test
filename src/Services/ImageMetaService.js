'use strict';

module.exports = function (db) {
  const {ImageMeta} = db;

  const get = function (id) {
    return ImageMeta.findOne({where: {id}});
  };

  const create = function(imageMetaData) {
    return ImageMeta.create(imageMetaData);
  };

  return {
    get,
    create
  };
};

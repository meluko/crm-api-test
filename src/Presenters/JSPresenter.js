'use strict';

module.exports = function (dependencies) {
  return function (path, params, callback) {
    const presenter = require(path);
    return callback(null, presenter(dependencies)(params));
  };
};

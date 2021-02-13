'use strict';

module.exports = function (dependencies) {
  const {lib: {fs, _}} = dependencies;

  return function (path, params, callback) {
    const template = fs.readFileSync(path);
    return callback(null, _.template(template)(params));
  };
};

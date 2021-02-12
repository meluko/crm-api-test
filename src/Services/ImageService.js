'use strict';

const fs = require('fs');
const {resolve} = require('path');

module.exports = dependencies => {
  const {uploadsPath} = dependencies.config;

  const saveImage = function(srcPath, extension) {
    const [,fileName] = srcPath.match(/.*\/(.*)/);
    const dstPath = resolve(uploadsPath, `${fileName}.${extension}`);
    fs.renameSync(srcPath, dstPath);

    return dstPath;
  };

  return {
    saveImage
  };
};

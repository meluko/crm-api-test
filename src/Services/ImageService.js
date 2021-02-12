'use strict';

const fs = require('fs');
const {resolve} = require('path');

module.exports = config => {

  const saveImage = function(srcPath) {
    const [,fileName] = srcPath.match(/.*\/(.*)/);
    const dstPath = resolve(config.uploadsPath, fileName);
    fs.renameSync(srcPath, dstPath);
  };

  return {
    saveImage
  };
};

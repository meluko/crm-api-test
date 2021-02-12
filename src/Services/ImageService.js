'use strict';

module.exports = dependencies => {
  const {uploadsPath} = dependencies.config;
  const {path: {resolve}, fs} = dependencies.lib;

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

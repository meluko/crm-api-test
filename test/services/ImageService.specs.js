'use strict';

const path = require('path');
const fs = require('fs');
const remove = require('remove');

const {expect} = require('../util/chai');
const ImageService = require('../../src/Services/ImageService');

const SAMPLE_IMAGE_PATH = path.join(__dirname, '/../assets/picture.png');
const TEST_TMP_PATH = path.join(__dirname, '/tmp');
const TEST_UPLOADS_PATH = path.join(__dirname, '/uploads');

const config = {uploadsPath: TEST_UPLOADS_PATH};
const imageService = ImageService({config, lib: {fs, path}});

describe('ImageService', function () {

  before(function () {
    fs.mkdirSync(TEST_TMP_PATH, { recursive: true });
    fs.mkdirSync(TEST_UPLOADS_PATH), { recursive: true };
  });

  after(function () {
    remove.removeSync(TEST_TMP_PATH, { recursive: true });
    remove.removeSync(TEST_UPLOADS_PATH, { recursive: true });
  });

  describe('saveImage', function () {

    it('Should store image from given path to uploads path', async function () {
      const imageName = 'image_0001';
      const extension = 'png' ;
      const dstPath = path.join(TEST_TMP_PATH, imageName);
      fs.copyFileSync(SAMPLE_IMAGE_PATH, dstPath);

      imageService.saveImage(dstPath, extension);

      const dirContent = fs.readdirSync(TEST_UPLOADS_PATH);

      expect(dirContent).to.be.deep.equal(['image_0001.png']);
    });

    it('Should return stored image path', async function () {
      const imageName = 'image_0001';
      const extension = 'png' ;
      const srcPath = path.join(TEST_TMP_PATH, imageName);
      fs.copyFileSync(SAMPLE_IMAGE_PATH, srcPath);

      const storePath = imageService.saveImage(srcPath, extension);

      expect(storePath).to.be.equal(path.join(TEST_UPLOADS_PATH, `${imageName}.${extension}`));
    });

  });

});

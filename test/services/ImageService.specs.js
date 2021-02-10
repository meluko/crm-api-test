'use strict';

const {join} = require('path');
const fs = require('fs');
const remove = require('remove');

const {expect} = require('../util/chai');
const ImageService = require('../../src/Services/ImageService');

const SAMPLE_IMAGE_PATH = join(__dirname, '/../assets/picture.png');
const TEST_TMP_PATH = join(__dirname, '/tmp');
const TEST_UPLOADS_PATH = join(__dirname, '/uploads');

const config = {uploadsPath: TEST_UPLOADS_PATH};
const imageService = ImageService({config});

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
      const path = join(TEST_TMP_PATH, imageName);
      fs.copyFileSync(SAMPLE_IMAGE_PATH, path);

      imageService.saveImage(path, extension);

      const dirContent = fs.readdirSync(TEST_UPLOADS_PATH);

      expect(dirContent).to.be.deep.equal(['image_0001.png']);
    });

    it('Should return stored image path', async function () {
      const imageName = 'image_0001';
      const extension = 'png' ;
      const srcPath = join(TEST_TMP_PATH, imageName);
      fs.copyFileSync(SAMPLE_IMAGE_PATH, srcPath);

      const storePath = imageService.saveImage(srcPath, extension);

      expect(storePath).to.be.equal(join(TEST_UPLOADS_PATH, `${imageName}.${extension}`));
    });

  });

});

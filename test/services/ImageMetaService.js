'use strict';

const config = require('config');
const {expect} = require('../util/chai');
const truncateTables = require('../util/truncateTables');

const models = require('../../src/DB/models');
const db = require('../../src/DB')(config.database, models);
const imageMetaService = require('../../src/Services/ImageMetaService')(db);

const sampleImageMeta = [
  {path: '/images/0001.png'},
  {path: '/images/0002.png'},
  {path: '/images/0003.png'},
];

describe('ImageMetaService', function () {

  beforeEach(async function () {
    await truncateTables(db)(['imageMeta']);

    for (let imageMeta of sampleImageMeta) {
      await db.ImageMeta.create(imageMeta);
    }
  });

  after(function () {
    db.sequelize.close();
  });

  describe('get', function () {

    it('should return an stored imageMeta by its id', async function () {
      const imageMeta = await imageMetaService.get(2);

      expect(imageMeta).to.be.shallowDeepEqual({
        id: 2, ...sampleImageMeta[1]
      });
    });

  });

  describe('create', function () {

    it('Should create a new imageMeta', async function () {
      const imageMetaData = {
        path: '/images/0004.png'
      };

      await imageMetaService.create(imageMetaData);

      const imageMeta = await db.ImageMeta.findOne({where: {id: 4}});
      expect(imageMeta).to.be.shallowDeepEqual({
        id: 4,
        path: '/images/0004.png'
      });
    });

    it('Should return created imageMeta', async function () {
      const imageMeta = {
        path: '/images/0004.png'
      };
      const createdImageMeta = await imageMetaService.create(imageMeta);

      expect(createdImageMeta).to.be.shallowDeepEqual({
        id: 4,
        path: '/images/0004.png'
      });
    });

  });

});

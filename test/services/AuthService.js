'use strict';

const config = require('config');
const sinon = require('sinon');
const lib = require('../../src/lib');
const {expect} = require('../util/chai');
const truncateTables = require('../util/truncateTables');

const models = require('../../src/DB/models');
const db = require('../../src/DB')(config.database, models);
const authService = require('../../src/Services/AuthService')({db, config, lib});

const sampleUsers = [
  {name: 'Rachel', surname: 'Green'},
  {name: 'Monica', surname: 'Geller'},
  {name: 'Phoebe', surname: 'Buffay'},
  {
    name: 'Joseph',
    surname: 'Tribbiani',
    githubId: 3244,
    githubLogin: 'joey',
    isAdmin: false
  },
  {
    name: 'Chandler',
    surname: 'Bing',
    githubId: 7777,
    githubLogin: 'muriel',
    isAdmin: true
  },
  {name: 'Ross', surname: 'Geller'}
];

describe('AuthService', function () {

  beforeEach(async function () {
    await truncateTables(db)(['user', 'accessToken']);

    for (let user of sampleUsers) {
      await db.User.create(user);
    }
  });

  after(function () {
    db.sequelize.close();
  });

  describe('storeToken', function () {

    it('should store given token', async function () {
      const user = await db.User.findOne({where: {githubId: 3244}});
      const accessToken = 'MYSUPERCOOLACCESSTOKEN';
      await authService.storeToken(accessToken, user);

      const token = await db.AccessToken.findOne({where: {githubId: 3244}, raw: true});

      expect(token).to.be.shallowDeepEqual({
        githubId: 3244,
        accessToken: accessToken
      });

    });

    it('should fill expiresAt field using token ttl config', async function () {
      this.clock = sinon.useFakeTimers();
      const user = await db.User.findOne({where: {githubId: 3244}});
      const accessToken = 'MYSUPERCOOLACCESSTOKEN';
      await authService.storeToken(accessToken, user);

      const token = await db.AccessToken.findOne({where: {githubId: 3244}});

      expect(token.expiresAt.getTime()).to.be.equal(Date.now() + config.auth.tokenTTL);

      this.clock.restore();
    });

  });

  describe('isValidToken', function() {

    it('Should return false if token does not exist', async function () {
      const isValidToken = await authService.isValidToken('NONEXISTENTTOKEN');

      expect(isValidToken).to.be.false;
    });

    it('Should return false if token is stale', async function () {
      this.clock = sinon.useFakeTimers();
      const accessToken = 'MYSUPERCOOLACCESSTOKEN';
      const user = await db.User.findOne({where: {githubId: 3244}});
      await authService.storeToken(accessToken, user);
      await db.AccessToken.update({createdAt: 0}, {where: {accessToken}});

      this.clock.tick(config.auth.tokenTTL);

      const isValidToken = await authService.isValidToken(accessToken);

      expect(isValidToken).to.be.false;
      this.clock.restore();
    });

    it('Should return true if token is valid', async function () {
      const accessToken = 'MYSUPERCOOLACCESSTOKEN';
      const user = await db.User.findOne({where: {githubId: 3244}});
      await authService.storeToken(accessToken, user);
      const isValidToken = await authService.isValidToken(accessToken);

      expect(isValidToken).to.be.true;
    });

  });

  describe('isAdminToken', function () {
    const userAccessToke = 'MYSUPERCOOLUSERACCESSTOKEN';
    const adminAccessToken = 'MYSUPERCOOLADMINACCESSTOKEN';
    const assignToken = async function(githubId, token) {
      const user = await db.User.findOne({where: {githubId}, raw: true});
      await authService.storeToken(token, user);
    };

    it('Should return true if token\'s user is an admin', async function () {
      await assignToken(7777, adminAccessToken);
      const isAdminUser = await authService.isAdminToken(adminAccessToken);

      expect(isAdminUser).to.be.true;
    });

    it('Should return false if token\'s user is not an admin', async function () {
      await assignToken(3244, userAccessToke);
      const isAdminUser = await authService.isAdminToken(userAccessToke);

      expect(isAdminUser).to.be.false;
    });

  });

});

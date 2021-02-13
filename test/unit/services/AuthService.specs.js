'use strict';

const config = require('config');
const sinon = require('sinon');
const {expect} = require('../../util/chai');
const truncateTables = require('../../util/truncateTables');

const models = require('../../../src/DB/models');
const db = require('../../../src/DB')(config.database, models);
const lib = {
  githubClient: {}
};
const authService = require('../../../src/Services/AuthService')({db, config, lib});

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

  describe('create', function () {

    it('should store given token', async function () {
      const user = await db.User.findOne({where: {githubId: 3244}});
      const accessToken = 'MYSUPERCOOLACCESSTOKEN';
      await authService.create(accessToken, user);

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
      await authService.create(accessToken, user);

      const token = await db.AccessToken.findOne({where: {githubId: 3244}});

      expect(token.expiresAt.getTime()).to.be.equal(Date.now() + config.auth.tokenTTL);

      this.clock.restore();
    });

  });

  describe('get', function() {

    it('Should include associated user with token data', async function() {
      const accessToken = 'MYSUPERCOOLACCESSTOKEN';
      const user = await db.User.findOne({where: {githubId: 3244}});
      await authService.create(accessToken, user);

      const tokenData = await authService.get(accessToken);

      expect(tokenData.user.dataValues).to.be.shallowDeepEqual(sampleUsers[3]);
    });

  });

  describe('isValidToken', function () {

    it('Should return false if token is stale', async function () {
      this.clock = sinon.useFakeTimers();
      const accessToken = 'MYSUPERCOOLACCESSTOKEN';
      const user = await db.User.findOne({where: {githubId: 3244}});
      await authService.create(accessToken, user);

      this.clock.tick(config.auth.tokenTTL);

      const token = await authService.get(accessToken);
      const isValidToken = authService.isValidToken(token);

      expect(isValidToken).to.be.false;
      this.clock.restore();
    });

    it('Should return true if token is valid', async function () {
      const accessToken = 'MYSUPERCOOLACCESSTOKEN';
      const user = await db.User.findOne({where: {githubId: 3244}});
      await authService.create(accessToken, user);

      const token = await authService.get(accessToken);
      const isValidToken = authService.isValidToken(token);

      expect(isValidToken).to.be.true;
    });

  });

  describe('isAdminToken', function () {
    const userAccessToken = 'MYSUPERCOOLUSERACCESSTOKEN';
    const adminAccessToken = 'MYSUPERCOOLADMINACCESSTOKEN';

    const assignToken = async function (githubId, token) {
      const user = await db.User.findOne({where: {githubId}, raw: true});
      await authService.create(token, user);
    };

    it('Should return true if token\'s user is an admin', async function () {
      await assignToken(7777, adminAccessToken);
      const token = await authService.get(adminAccessToken);
      const isAdminUser = authService.isAdminToken(token);

      expect(isAdminUser).to.be.true;
    });

    it('Should return false if token\'s user is not an admin', async function () {
      await assignToken(3244, userAccessToken);
      const token = await authService.get(userAccessToken);

      const isAdminUser = authService.isAdminToken(token);

      expect(isAdminUser).to.be.false;
    });

  });

  describe('fetchAccessToken', function () {

    it('should forward call to githubClient', function () {
      const fetchAccessToken = sinon.stub();
      lib.githubClient.fetchAccessToken = fetchAccessToken;
      authService.fetchAccessToken('code', 'state');

      expect(fetchAccessToken.callCount).to.be.equal(1);
      expect(fetchAccessToken.getCall(0).args).to.be.deep.equal(['code', 'state']);
    });

  });

  describe('fetchUserData', function () {

    it('should forward call to githubClient', function () {
      const fetchUserData = sinon.stub();
      lib.githubClient.fetchUserData = fetchUserData;
      authService.fetchUserData('accessToken');

      expect(fetchUserData.callCount).to.be.equal(1);
      expect(fetchUserData.getCall(0).args[0]).to.be.equal('accessToken');
    });

  });
});

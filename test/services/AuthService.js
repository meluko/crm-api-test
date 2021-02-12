'use strict';

const config = require('config');
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
      const access_token = 'my_super_cool_access_token';
      await authService.storeToken(access_token, user);

      const authToken = await db.AccessToken.findOne({where: {githubId: 3244}, raw: true});

      expect(authToken).to.be.shallowDeepEqual({
        githubId: 3244,
        accessToken: access_token
      });

    });

  });


  describe('isAdminToken', function () {
    const user_access_token = 'my_super_cool_user_access_token';
    const admin_access_token = 'my_super_cool_admin_access_token';
    const assignToken = async function(githubId, token) {
      const user = await db.User.findOne({where: {githubId}, raw: true});
      await authService.storeToken(token, user);
    };

    it('Should return true if token\'s user is an admin', async function () {
      await assignToken(7777, admin_access_token);
      const isAdminUser = await authService.isAdminToken(admin_access_token);

      expect(isAdminUser).to.be.true;
    });

    it('Should return false if token\'s user is not an admin', async function () {
      await assignToken(3244, user_access_token);
      const isAdminUser = await authService.isAdminToken(user_access_token);

      expect(isAdminUser).to.be.false;
    });

  });

});

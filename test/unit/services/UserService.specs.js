'use strict';

const config = require('config');
const {expect} = require('../../util/chai');
const truncateTables = require('../../util/truncateTables');

const models = require('../../../src/DB/models');
const util = {bindAuditHooks: () => {}};
const db = require('../../../src/DB')({config, models, util});
const userService = require('../../../src/Services/UserService')({db});

const sampleUsers = [
  {name: 'Rachel', surname: 'Green'},
  {name: 'Monica', surname: 'Geller'},
  {name: 'Phoebe', surname: 'Buffay'},
  {name: 'Joseph', surname: 'Tribbiani', githubId: 3244, githubLogin: 'Joey'},
  {name: 'Chandler', surname: 'Bing'},
  {name: 'Ross', surname: 'Geller'}
];

describe('UserService', function () {

  beforeEach(async function () {
    await truncateTables(db)(['user']);

    for (let user of sampleUsers) {
      await db.User.create(user);
    }
  });

  after(function () {
    db.sequelize.close();
  });

  describe('get', function () {

    it('should return a user by its id', async function () {
      const user = await userService.get(3);

      expect(user).to.be.shallowDeepEqual({
        id: 3, ...sampleUsers[2]
      });
    });

  });

  describe('find', function () {

    it('Should list stored users', async function () {
      const createdUser = await userService.find();
      expect(createdUser).to.be.shallowDeepEqual({
        count: 6,
        rows: [
          {id: 1, name: 'Rachel', surname: 'Green'},
          {id: 2, name: 'Monica', surname: 'Geller'},
          {id: 3, name: 'Phoebe', surname: 'Buffay'},
          {id: 4, name: 'Joseph', surname: 'Tribbiani'},
          {id: 5, name: 'Chandler', surname: 'Bing'},
          {id: 6, name: 'Ross', surname: 'Geller'},
        ]
      });
    });

  });

  describe('create', function () {

    it('Should create a new user', async function () {
      const userData = {
        name: 'Don',
        surname: 'Draper'
      };

      await userService.create(userData);

      const user = await db.User.findOne({where: {id: 7}});
      expect(user).to.be.shallowDeepEqual({
        id: 7,
        name: 'Don',
        surname: 'Draper',
        isAdmin: false
      });
    });

    it('Should return created user', async function () {
      const user = {
        name: 'Don',
        surname: 'Draper'
      };

      const createdUser = await userService.create(user);

      expect(createdUser).to.be.shallowDeepEqual({
        id: 7,
        name: 'Don',
        surname: 'Draper',
        isAdmin: false
      });
    });

  });

  describe('update', function () {

    it('should update existing user', async function () {
      const user = await userService.get(4);
      const userData = {
        name: 'fred',
        surname: 'astaire'
      };

      const updatedUser = await userService.update(user, userData);

      expect(updatedUser).to.be.shallowDeepEqual(userData);
    });

    it('should return user record after update if found', async function () {
      const user = await userService.get(4);
      const userData = {
        name: 'fred',
        surname: 'astaire'
      };

      const updatedUser = await userService.update(user, userData);

      expect(updatedUser).to.be.shallowDeepEqual(userData);
    });

    it('should return null if user was not founbd', async function () {
      const user = await userService.get(10);
      const userData = {
        name: 'fred',
        surname: 'astaire'
      };

      const updatedUser = await userService.update(user, userData);

      expect(updatedUser).to.be.null;
    });
  });

  describe('destroy', function () {

    it('should destroy existing record', async function () {
      const id = 2;

      await userService.destroy(id);

      const user = await db.User.findOne({where: {id}});
      expect(user).to.be.null;
    });

  });

  describe('getByGithubId', function () {

    it('should return a user by its Github id', async function () {
      const user = await userService.getByGithubId(3244);

      expect(user).to.be.shallowDeepEqual(sampleUsers[3]);
    });

  });


  describe('createGithubUser', function () {

    it('should create a default user with github data', async function () {
      const userData = {
        login: 'harry',
        id: 933257,
        name: 'Harry Belafonte'
      };

      await userService.createGithubUser(userData);

      const user = await db.User.findOne({where: {githubId: 933257}});
      expect(user).to.be.shallowDeepEqual({
        name: 'User',
        surname: 'Harry Belafonte',
        isAdmin: false,
        githubId: 933257,
        githubLogin: 'harry'
      });
    });

  });

});

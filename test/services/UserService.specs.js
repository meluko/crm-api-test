'use strict';

const config = require('config');
const {expect} = require('../util/chai');
const truncateTables = require('../util/truncateTables');

const models = require('../../src/DB/models');
const db = require('../../src/DB')(config.database, models);
const userService = require('../../src/Services/UserService')(db);

const sampleUsers = [
  {name: 'Rachel', surname: 'Green'},
  {name: 'Monica', surname: 'Geller'},
  {name: 'Phoebe', surname: 'Buffay'},
  {name: 'Joey', surname: 'Tribbiani'},
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

  after(function() {
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
          {id: 4, name: 'Joey', surname: 'Tribbiani'},
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
      const id = 4;
      const userData = {
        name: 'fred',
        surname: 'astaire'
      };

      await userService.update(id, userData);

      const user = await db.User.findOne({where: {id}});
      expect(user).to.be.shallowDeepEqual({id, ...userData});
    });

    it('should return user record after update if found', async function () {
      const id = 4;
      const userData = {
        name: 'fred',
        surname: 'astaire'
      };

      const user = await userService.update(id, userData);

      expect(user).to.be.shallowDeepEqual({id, ...userData});
    });

    it('should return null if user was not founbd', async function () {
      const id = 10;
      const userData = {
        name: 'fred',
        surname: 'astaire'
      };

      const user = await userService.update(id, userData);

      expect(user).to.be.null;
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

});

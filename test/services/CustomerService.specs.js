'use strict';

const config = require('config');
const {expect} = require('../util/chai');
const truncateTables = require('../util/truncateTables');

const models = require('../../src/DB/models');
const db = require('../../src/DB')(config.database, models);
const customerService = require('../../src/Services/CustomerService')(db);

const sampleCustomers = [
  {name: 'Chico', surname: 'Marx'},
  {name: 'Gummo', surname: 'Marx'},
  {name: 'Harpo', surname: 'Marx'},
  {name: 'Groucho', surname: 'Marx'},
  {name: 'Zeppo', surname: 'Marx'}
];

describe('CustomerService', function () {

  beforeEach(async function () {
    await truncateTables(db)(['customer']);

    for (let customer of sampleCustomers) {
      await db.Customer.create(customer);
    }
  });

  after(function() {
    db.sequelize.close();
  });

  describe('get', function () {

    it('should return a customer by its id', async function () {
      const customer = await customerService.get(3);

      expect(customer).to.be.shallowDeepEqual({
        id: 3, ...sampleCustomers[2]
      });
    });

  });

  describe('find', function () {

    it('Should list stored customers', async function () {
      const createdCustomer = await customerService.find();
      expect(createdCustomer).to.be.shallowDeepEqual({
        count: 5,
        rows: [
          {id: 1, name: 'Chico', surname: 'Marx'},
          {id: 2, name: 'Gummo', surname: 'Marx'},
          {id: 3, name: 'Harpo', surname: 'Marx'},
          {id: 4, name: 'Groucho', surname: 'Marx'},
          {id: 5, name: 'Zeppo', surname: 'Marx'}
        ]
      });
    });

  });

  describe('create', function () {

    it('Should create a new customer', async function () {
      const customerData = {
        name: 'Hannibal',
        surname: 'Lecter'
      };

      await customerService.create(customerData);

      const customer = await db.Customer.findOne({where:{id: 6}});
      expect(customer).to.be.shallowDeepEqual({
        id: 6,
        name: 'Hannibal',
        surname: 'Lecter',
        imageMetaId: null
      });
    });

    it('Should return created customer', async function () {
      const customer = {
        name: 'Hannibal',
        surname: 'Lecter'
      };
      const createdCustomer = await customerService.create(customer);
      expect(createdCustomer).to.be.shallowDeepEqual({
        id: 6,
        name: 'Hannibal',
        surname: 'Lecter',
        imageMetaId: null
      });
    });

  });

  describe('update', function () {

    it('should update existing customer', async function () {
      const id = 4;
      const customerData = {
        name: 'fred',
        surname: 'astaire'
      };

      await customerService.update(id, customerData);

      const customer = await db.Customer.findOne({where: {id}});
      expect(customer).to.be.shallowDeepEqual({id, ...customerData});
    });

    it('should return customer record after update if found', async function () {
      const id = 4;
      const customerData = {
        name: 'fred',
        surname: 'astaire'
      };

      const customer = await customerService.update(id, customerData);

      expect(customer).to.be.shallowDeepEqual({id, ...customerData});
    });

    it('should return null if customer was not founbd', async function () {
      const id = 10;
      const customerData = {
        name: 'fred',
        surname: 'astaire'
      };

      const customer = await customerService.update(id, customerData);

      expect(customer).to.be.null;
    });
  });

  describe('destroy', function () {

    it('should destroy existing record', async function () {
      const id = 2;

      await customerService.destroy(id);

      const customer = await db.Customer.findOne({where: {id}});
      expect(customer).to.be.null;
    });

  });

});

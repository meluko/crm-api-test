'use strict';

const paginationFromQuery = require('../util/paginationFromQuery');

module.exports = function (dependencies) {
  const {Customer} = dependencies.db;

  const get = function (id) {
    return Customer.findOne({where: {id}});
  };

  const find = function (query) {
    return Customer.findAndCountAll({...paginationFromQuery(query)});
  };

  const create = function (customerData) {
    return Customer
      .create(customerData)
      .then(user => user.reload())
      .then(user => user.dataValues);
  };

  const update = function (customer, customerData) {
    return customer && customer
      .update(customerData)
      .then(it => it.reload())
      .then(customer => customer && customer.dataValues);
  };

  const destroy = function(id) {
    return Customer.destroy({where: {id}});
  };

  return {
    get,
    find,
    create,
    update,
    destroy
  };
};

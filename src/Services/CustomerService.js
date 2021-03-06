'use strict';

const paginationFromQuery = require('../Util/paginationFromQuery');

module.exports = function (dependencies) {
  const {Customer} = dependencies.db;

  const get = function (id) {
    return Customer
      .findOne({where: {id}})
      .then(customer => customer);
  };

  const find = function (query) {
    return Customer.findAndCountAll({...paginationFromQuery(query)});
  };

  const create = function (customerData) {
    return Customer
      .create(customerData)
      .then(customer => customer.reload());
  };

  const update = function (customer, customerData) {
    return customer && customer
      .update(customerData)
      .then(it => it.reload());
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

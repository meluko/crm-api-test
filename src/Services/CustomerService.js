'use strict';

const paginationFromQuery = require('../util/paginationFromQuery');

module.exports = function (dependencies) {
  const {Customer} = dependencies.db;

  const get = async function (id) {
    return await Customer.findOne({where: {id}});
  };

  const find = function (query) {
    return Customer.findAndCountAll({...paginationFromQuery(query)});
  };

  const create = function (customerData) {
    return Customer.create(customerData);
  };

  const update = async function (id, customerData) {
    const options = {where: {id}, plain: true};
    const [affectedRows] = await Customer.update(customerData, options);

    if (!affectedRows) {
      return null;
    }

    return {id, ...customerData};
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

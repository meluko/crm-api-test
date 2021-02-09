'use strict';

module.exports = function(dependencies) {
  const {customerService} = dependencies.services;

  const list = function (req, res) {
    const customers = customerService.list();
    res.status(200).json({
      count: customers.length,
      rows: customers
    });
  };

  const create = function (req, res) {
    const customer = customerService.create(req.body);
    res.status(200).json(customer);
  };

  const get = function (req, res) {
    const {customerId} = req.params;
    const customer = customerService.get(customerId);
    if (!customer) {
      return res.status(404).send('Not Found');
    }
    res.status(200).json(customer);
  };

  const update = function (req, res) {
    const {customerId} = req.params;
    const customer = customerService.get(customerId);
    if (!customer) {
      return res.status(404).send('Not Found');
    }
    const updatedcustomer = customerService.update(customerId, req.body);
    res.status(200).json(updatedcustomer);
  };

  const remove = function (req, res) {
    const {customerId} = req.params;
    const customer = customerService.get(customerId);
    if (!customer) {
      return res.status(404).send('Not Found');
    }
    customerService.remove(customerId);
    res.status(200).json(customer);
  };

  return {
    list,
    create,
    get,
    update,
    remove
  };

};

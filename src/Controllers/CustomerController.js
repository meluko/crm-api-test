'use strict';

module.exports = function(dependencies) {
  const {
    customerService,
    imageMetaService
  } = dependencies.services;

  const list = async function (req, res) {
    const customers = await customerService.find();
    res.status(200).json({
      count: customers.length,
      rows: customers
    });
  };

  const create = async function (req, res) {
    const {imageMetaId} = req.body;
    if (imageMetaId) {
      const imageMeta = await imageMetaService.get(imageMetaId);
      if (!imageMeta) {
        return res.status(400).send('Invalid imageMeta');
      }
    }
    const customer = await customerService.create(req.body);
    res.status(200).json(customer);
  };

  const get = async function (req, res) {
    const {customerId} = req.params;
    const customer = await customerService.get(customerId);
    if (!customer) {
      return res.status(404).send('Not Found');
    }
    res.status(200).json(customer);
  };

  const update = async function (req, res) {
    const {customerId} = req.params;
    const customer = await customerService.get(customerId);
    if (!customer) {
      return res.status(404).send('Not Found');
    }
    const updatedcustomer = await customerService.update(customerId, req.body);
    res.status(200).json(updatedcustomer);
  };

  const remove = async function (req, res) {
    const {customerId} = req.params;
    const customer = await customerService.get(customerId);
    if (!customer) {
      return res.status(404).send('Not Found');
    }
    await customerService.destroy(customerId);
    res.status(200).json({});
  };

  return {
    list,
    create,
    get,
    update,
    remove
  };

};

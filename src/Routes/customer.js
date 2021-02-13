'use strict';

module.exports = dependencies => app => {
  const {
    schemaValidator
  } = dependencies.middlewares;
  const customerController = dependencies.controllers.customerController;
  const customerSchema = dependencies.schemas.customer;

  app.get(
    '/api/v1/customer',
    customerController.list
  );
  app.post(
    '/api/v1/customer',
    schemaValidator.body(customerSchema.customerBody),
    customerController.create
  );

  app.get(
    '/api/v1/customer/:customerId',
    schemaValidator.params(customerSchema.customerId),
    customerController.get
  );
  app.put(
    '/api/v1/customer/:customerId',
    schemaValidator.params(customerSchema.customerId),
    schemaValidator.body(customerSchema.customerBody),
    customerController.update
  );
  app.delete(
    '/api/v1/customer/:customerId',
    schemaValidator.params(customerSchema.customerId),
    customerController.remove
  );
};

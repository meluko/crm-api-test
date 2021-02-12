'use strict';

module.exports = dependencies => app => {
  const {
    claimRole,
    schemaValidator
  } = dependencies.middlewares;
  const customerController = dependencies.controllers.customerController;
  const customerSchema = dependencies.schemas.customer;

  const claimRoles = claimRole('user', 'admin');

  app.get(
    '/api/v1/customer',
    claimRoles,
    customerController.list
  );
  app.post(
    '/api/v1/customer',
    claimRoles,
    schemaValidator.body(customerSchema.customerBody),
    customerController.create
  );

  app.get(
    '/api/v1/customer/:customerId',
    claimRoles,
    schemaValidator.params(customerSchema.customerId),
    customerController.get
  );
  app.put(
    '/api/v1/customer/:customerId',
    claimRoles,
    schemaValidator.params(customerSchema.customerId),
    schemaValidator.body(customerSchema.customerBody),
    customerController.update
  );
  app.delete(
    '/api/v1/customer/:customerId',
    claimRoles,
    schemaValidator.params(customerSchema.customerId),
    customerController.remove
  );
};

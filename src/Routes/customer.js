'use strict';

const USER_TOKEN = 'userToken';
const ADMIN_TOKEN = 'adminToken';

module.exports = dependencies => app => {
  const {
    validateToken,
    schemaValidator,
  } = dependencies.middlewares;
  const customerController = dependencies.controllers.customerController;
  const customerSchema = dependencies.schemas.customer;

  app.get(
    '/api/v1/customer',
    validateToken([USER_TOKEN, ADMIN_TOKEN]),
    customerController.list
  );
  app.post(
    '/api/v1/customer',
    validateToken([USER_TOKEN, ADMIN_TOKEN]),
    schemaValidator.body(customerSchema.customerBody),
    customerController.create
  );

  app.get(
    '/api/v1/customer/:customerId',
    validateToken([USER_TOKEN, ADMIN_TOKEN]),
    schemaValidator.params(customerSchema.customerId),
    customerController.get
  );
  app.put(
    '/api/v1/customer/:customerId',
    validateToken([USER_TOKEN, ADMIN_TOKEN]),
    schemaValidator.params(customerSchema.customerId),
    schemaValidator.body(customerSchema.customerBody),
    customerController.update
  );
  app.delete(
    '/api/v1/customer/:customerId',
    validateToken([USER_TOKEN, ADMIN_TOKEN]),
    schemaValidator.params(customerSchema.customerId),
    customerController.remove
  );
};

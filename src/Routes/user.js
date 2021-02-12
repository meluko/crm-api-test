'use strict';

const ADMIN_TOKEN = 'adminToken';

module.exports = dependencies => app => {
  const {
    validateToken,
    schemaValidator,
  } = dependencies.middlewares;
  const userController = dependencies.controllers.userController;
  const userSchema = dependencies.schemas.user;

  app.get(
    '/api/v1/user',
    validateToken([ADMIN_TOKEN]),
    userController.list
  );

  app.post(
    '/api/v1/user',
    validateToken([ADMIN_TOKEN]),
    schemaValidator.body(userSchema.userBody),
    userController.create
  );

  app.get(
    '/api/v1/user/:userId',
    validateToken([ADMIN_TOKEN]),
    schemaValidator.params(userSchema.userId),
    userController.get
  );

  app.put(
    '/api/v1/user/:userId',
    validateToken([ADMIN_TOKEN]),
    schemaValidator.params(userSchema.userId),
    schemaValidator.body(userSchema.userBody),
    userController.update
  );

  app.delete(
    '/api/v1/user/:userId',
    validateToken([ADMIN_TOKEN]),
    schemaValidator.params(userSchema.userId),
    userController.remove
  );
};

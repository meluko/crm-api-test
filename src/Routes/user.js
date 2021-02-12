'use strict';

module.exports = dependencies => app => {
  const {
    schemaValidator,
  } = dependencies.middlewares;
  const userController = dependencies.controllers.userController;
  const userSchema = dependencies.schemas.user;

  app.get(
    '/api/v1/user',
    userController.list
  );

  app.post(
    '/api/v1/user',
    schemaValidator.body(userSchema.userBody),
    userController.create
  );

  app.get(
    '/api/v1/user/:userId',
    schemaValidator.params(userSchema.userId),
    userController.get
  );

  app.put(
    '/api/v1/user/:userId',
    schemaValidator.params(userSchema.userId),
    schemaValidator.body(userSchema.userBody),
    userController.update
  );

  app.delete(
    '/api/v1/user/:userId',
    schemaValidator.params(userSchema.userId),
    userController.remove
  );
};

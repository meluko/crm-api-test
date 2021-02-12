'use strict';

module.exports = dependencies => app => {
  const {
    claimRole,
    schemaValidator,
  } = dependencies.middlewares;
  const userController = dependencies.controllers.userController;
  const userSchema = dependencies.schemas.user;

  const claimRoles = claimRole('admin');

  app.get(
    '/api/v1/user',
    claimRoles,
    userController.list
  );

  app.post(
    '/api/v1/user',
    claimRoles,
    schemaValidator.body(userSchema.userBody),
    userController.create
  );

  app.get(
    '/api/v1/user/:userId',
    claimRoles,
    schemaValidator.params(userSchema.userId),
    userController.get
  );

  app.put(
    '/api/v1/user/:userId',
    claimRoles,
    schemaValidator.params(userSchema.userId),
    schemaValidator.body(userSchema.userBody),
    userController.update
  );

  app.delete(
    '/api/v1/user/:userId',
    claimRoles,
    schemaValidator.params(userSchema.userId),
    userController.remove
  );
};

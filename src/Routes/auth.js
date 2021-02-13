'use strict';

module.exports = dependencies => app => {
  const authController = dependencies.controllers.authController;

  app.get('/auth/login', authController.login);
  app.get('/auth/callback', authController.callback);
};

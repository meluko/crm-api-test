'use strict';

module.exports = function(dependencies) {
  return {
    userController: require('./UserController')(dependencies),
    customerController: require('./CustomerController')(dependencies),
    imageController: require('./ImageController')(dependencies),
    authController: require('./AuthController')(dependencies)
  };
};

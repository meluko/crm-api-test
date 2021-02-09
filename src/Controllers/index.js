'use strict';

module.exports = function(dependencies) {
  return {
    userController: require('./UserController')(dependencies),
    customerController: require('./CustomerController')(dependencies)
  };
};

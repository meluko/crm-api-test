'use strict';

module.exports = function(dependencies) {
  return {
    authService: require('./AuthService')(dependencies),
    userService: require('./UserService')(dependencies),
    customerService: require('./CustomerService')(dependencies),
    imageService: require('./ImageService')(dependencies),
    imageMetaService: require('./ImageMetaService')(dependencies)
  };
};

'use strict';

module.exports = function(dependencies) {
  return {
    userService: require('./UserService')(dependencies),
    customerService: require('./CustomerService')(dependencies),
    imageService: require('./ImageService')(dependencies),
    imageMetaService: require('./ImageMetaService')(dependencies)
  };
};

'use strict';

module.exports = dependencies => {
  const {
    httpContext
  } = dependencies.lib;

  const beforeCreate = function(modelInstance) {
    const accessToken = httpContext.get('accessToken');
    modelInstance.createdBy = accessToken.user.id;
    modelInstance.updatedBy = accessToken.user.id;
  };

  const beforeUpdate = function(modelInstance) {
    const accessToken = httpContext.get('accessToken');
    modelInstance.updatedBy = accessToken.user.id;
  };

  return function(model) {
    model.beforeCreate(beforeCreate);
    model.beforeUpdate(beforeUpdate);

    return model;
  };
};

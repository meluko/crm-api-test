'use strict';

module.exports = dependencies => {
  const {
    httpContext
  } = dependencies.lib;

  const beforeCreate = function (modelInstance) {
    const accessToken = httpContext.get('accessToken');
    if (accessToken && accessToken.user) {
      modelInstance.createdBy = accessToken.user.id;
      modelInstance.updatedBy = accessToken.user.id;
    }
  };

  const beforeUpdate = function (modelInstance) {
    const accessToken = httpContext.get('accessToken');
    if (accessToken && accessToken.user) {
      modelInstance.updatedBy = accessToken.user.id;
    }
  };

  return function (model) {
    model.beforeCreate(beforeCreate);
    model.beforeUpdate(beforeUpdate);

    return model;
  };
};

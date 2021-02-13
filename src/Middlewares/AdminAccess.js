'use strict';

module.exports = function (dependencies) {
  const {
    authService
  } = dependencies.services;
  const {
    httpContext
  } = dependencies.lib;

  return function (req, res, next) {
    const accessToken = httpContext.get('accessToken');
    if (!authService.isAdminToken(accessToken)) {
      return res.sendStatus(403);
    }

    next();
  };

};

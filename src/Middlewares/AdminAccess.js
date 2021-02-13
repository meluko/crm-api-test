'use strict';

module.exports = function (dependencies) {
  const {
    authService
  } = dependencies.services;

  return async function (req, res, next) {
    const isAdminToken = await authService.isAdminToken(req.token);
    if (!isAdminToken) {
      return res.sendStatus(403);
    }

    next();
  };

};

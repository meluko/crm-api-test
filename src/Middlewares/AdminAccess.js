'use strict';

module.exports = function (dependencies) {
  const {
    authService
  } = dependencies.services;

  return async function (req, res, next) {
    if (!await authService.isAdminToken(req.token)) {
      return res.sendStatus(403);
    }

    next();
  };

};

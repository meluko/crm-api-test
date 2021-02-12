'use strict';


module.exports = dependencies => allowedRoles => {
  const {
    authService
  } = dependencies.services;

  const checkRoles = function (req, res, next) {
    if (!authService.tokenHasRoles(req.token, allowedRoles)) {
      return res.sendStatus(403);
      //res.redirect(302, '/auth/login');
    }

    next();
  };

  return checkRoles;
};

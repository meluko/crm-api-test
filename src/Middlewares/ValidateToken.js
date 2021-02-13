'use strict';

module.exports = function (dependencies) {
  const {authService} = dependencies.services;
  return async function (req, res, next) {
    const authHeader = req.headers.authorization || '';
    const [, token] = authHeader.match(/Bearer (.+)/) || [];

    if (!token) {
      return res.sendStatus(401);
    }

    req.token = await authService.get(token);
    if (!req.token || !authService.isValidToken(token)) {
      return res.sendStatus(401);
      //res.redirect(302, '/auth/login');
    }

    next();
  };
};

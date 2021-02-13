'use strict';

module.exports = function (dependencies) {
  const {authService} = dependencies.services;
  return async function (req, res, next) {
    const authHeader = req.headers.authorization || '';
    const [, token] = authHeader.match(/Bearer (.+)/) || [];

    if (!token) {
      return res.sendStatus(401);
    }

    const isValid = await authService.isValidToken(token);
    if (!isValid) {
      return res.sendStatus(401);
      //res.redirect(302, '/auth/login');
    }

    req.token = token;
    next();
  };
};

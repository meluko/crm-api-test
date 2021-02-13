'use strict';

module.exports = function (dependencies) {
  const {authService} = dependencies.services;
  const {httpContext} = dependencies.lib;
  return async function (req, res, next) {
    const authHeader = req.headers.authorization || '';
    const [, token] = authHeader.match(/Bearer (.+)/) || [];

    if (!token) {
      return res.sendStatus(401);
    }

    const accessToken = await authService.get(token);
    if (!accessToken || !authService.isValidToken(accessToken)) {
      return res.sendStatus(401);
      //res.redirect(302, '/auth/login');
    }

    httpContext.set('accessToken', accessToken);
    next();
  };
};

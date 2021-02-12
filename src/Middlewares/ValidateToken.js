'use strict';

// ToDo: Check this token exists against database and it is not stale
const isValidToken = function () {
  return true;
};

module.exports = () => (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [,token] = authHeader.match(/Bearer (.+)/) || [];

  if (!token || !isValidToken(token)) {
    return res.sendStatus(401);
    //res.redirect(302, '/auth/login');
  }

  req.token = token;
  next();
};

'use strict';

module.exports = allowed_roles => (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.match(/Bearer (.+)/);

  if (!token) {
    return res.sendStatus(401);
  }

  if (!allowed_roles.includes(token[1])) {
    return res.sendStatus(403);
  }

  next();
};

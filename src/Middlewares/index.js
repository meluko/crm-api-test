'use strict';

const ValidateToken = require('./ValidateToken');
const AdminAccess = require('./AdminAccess');

module.exports = function (dependencies) {
  const {
    bodyParser,
    expressJoi,
    httpContext
  } = dependencies.lib;
  return {
    jsonBodyParser: bodyParser.json(),
    schemaValidator: expressJoi.createValidator(),
    httpContext: httpContext.middleware,
    validateToken: ValidateToken(dependencies),
    adminAccess: AdminAccess(dependencies)
  };
};

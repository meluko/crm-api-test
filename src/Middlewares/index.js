'use strict';

const ValidateToken = require('./ValidateToken');
const AdminAccess = require('./AdminAccess');

module.exports = function (dependencies) {
  const {
    bodyParser,
    expressJoi
  } = dependencies.lib;
  return {
    jsonBodyParser: bodyParser.json(),
    schemaValidator: expressJoi.createValidator({}),
    validateToken: ValidateToken(dependencies),
    adminAccess: AdminAccess(dependencies)
  };
};

'use strict';

const ValidateToken = require('./ValidateToken');
const ClaimRole = require('./ClaimRole');

module.exports = function (dependencies) {
  const {
    bodyParser,
    expressJoi
  } = dependencies.lib;
  return {
    jsonBodyParser: bodyParser.json(),
    schemaValidator: expressJoi.createValidator({}),
    validateToken: ValidateToken(dependencies),
    claimRole: ClaimRole(dependencies)
  };
};

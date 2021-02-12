'use strict';

const schemaValidator = require('express-joi-validation').createValidator({});

module.exports = function (dependencies) {

  const {open_id, jwt, jwt_decode} = dependencies;
  const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-meluko.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://localhost:8088',
    issuer: 'https://dev-meluko.eu.auth0.com',
    algorithms: ['RS256']
  });

  return {
    checkJwt,
    schemaValidator
  };
};

'use strict';

const schemaValidator = require('express-joi-validation').createValidator({});
const validateToken = require('./validateToken');

module.exports = {
  schemaValidator,
  validateToken
};

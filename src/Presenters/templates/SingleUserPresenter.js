'use strict';

const _ = require('lodash');

const FIELDS = [
  'id', 'name', 'surname', 'isAdmin', 'githubId', 'githubLogin',
  'createdAt', 'updatedAt', 'createdBy', 'updatedBy'
];

module.exports = () => params => {
  params = params.dataValues || params;
  return _.pick(params, FIELDS);
};


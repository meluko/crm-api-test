'use strict';

const _ = require('lodash');

const USER_FIELDS = ['id', 'name', 'surname', 'imageMetaId'];
const ADMIN_USER_FIELDS = [...USER_FIELDS, 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];

module.exports = isAdmin => params => {
  params = params.dataValues || params;
  return _.pick(params, isAdmin ? ADMIN_USER_FIELDS : USER_FIELDS);
};


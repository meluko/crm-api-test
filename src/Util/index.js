'use strict';

module.exports = dependencies => {
  return {
    bindAuditHooks: require('./BindAuditHooks')(dependencies),
    paginationFromQuery: require('./paginationFromQuery')
  };
};

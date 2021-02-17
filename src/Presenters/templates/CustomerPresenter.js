'use strict';

const singleCustomerPresenter = require('./SingleCustomerPresenter');

module.exports = ({lib: {httpContext}}) => params => {
  const isAdmin = httpContext.get('accessToken').user.isAdmin;
  return singleCustomerPresenter(isAdmin)(params);
};


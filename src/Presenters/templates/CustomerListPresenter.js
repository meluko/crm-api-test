'use strict';

const singleCustomerPresenter = require('./SingleCustomerPresenter');

module.exports = ({lib: {httpContext}}) => params => {
  const {count, rows} = params;
  const isAdmin = httpContext.get('accessToken').user.isAdmin;
  const presenter = singleCustomerPresenter(isAdmin);
  return {
    count,
    rows: rows.map(customer => presenter(customer))
  };
};


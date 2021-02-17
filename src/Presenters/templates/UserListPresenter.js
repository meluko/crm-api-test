'use strict';

const SingleUserPresenter = require('./SingleUserPresenter');

module.exports = () => params => {
  const {count, rows} = params;
  const presenter = SingleUserPresenter();
  return {
    count,
    rows: rows.map(customer => presenter(customer))
  };
};


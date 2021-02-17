'use strict';

const SingleUserPresenter = require('./SingleUserPresenter');

module.exports = () => params => {
  return SingleUserPresenter()(params);
};


'use strict';

const HTMLPresenter = require('./HTMLPresenter');
const JSPresenter = require('./JSPresenter');

module.exports = function (dependencies) {
  return {
    html: HTMLPresenter(dependencies),
    js: JSPresenter(dependencies)
  };
};

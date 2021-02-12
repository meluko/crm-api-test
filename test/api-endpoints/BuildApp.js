'use strict';

module.exports = function(services, controllers, routes) {
  const App = require('../../src/App');
  const middlewares = require('../../src/middlewares');
  const schemas = require('../../src/schemas');

  return App(routes({middlewares, controllers, schemas}));
};

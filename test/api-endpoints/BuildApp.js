'use strict';

module.exports = function(services, controllers, routes) {
  const App = require('../../src/App');
  const middlewares = require('../../src/Middlewares');
  const schemas = require('../../src/Schemas');

  return App(routes({middlewares, controllers, schemas}));
};

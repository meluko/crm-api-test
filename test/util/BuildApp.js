'use strict';

const App = require('../../src/App');
const lib = require('../../src/lib');
const Middlewares = require('../../src/Middlewares');
const schemas = require('../../src/schemas');

module.exports = function({routes, ...dependencies}) {
  dependencies.lib = lib;
  dependencies.middlewares = Middlewares(dependencies);
  dependencies.schemas = schemas;
  dependencies.routes = routes(dependencies);

  const views = it => it;
  return App({schemas, views, ...dependencies});
};

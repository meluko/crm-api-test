'use strict';

const config = require('config');
const App = require('../../src/App');
const Lib = require('../../src/Lib');
const Middlewares = require('../../src/Middlewares');
const schemas = require('../../src/schemas');

module.exports = function({routes, ...dependencies}) {
  dependencies.config = config;
  dependencies.lib = Lib(dependencies);
  dependencies.middlewares = Middlewares(dependencies);
  dependencies.schemas = schemas;
  dependencies.routes = routes(dependencies);

  const views = it => it;
  return App({schemas, views, ...dependencies});
};

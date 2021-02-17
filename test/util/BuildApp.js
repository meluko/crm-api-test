'use strict';

const config = require('config');
const App = require('../../src/App');
const Lib = require('../../src/Lib');
const Middlewares = require('../../src/Middlewares');
const Presenters = require('../../src/Presenters');
const schemas = require('../../src/schemas');

module.exports = function({routes, ...dependencies}) {
  dependencies.config = config;

  dependencies.lib = Lib(dependencies);
  dependencies.lib.expressBunyanLogger = () => (req, res, next) => next();
  dependencies.middlewares = Middlewares(dependencies);
  dependencies.schemas = schemas;
  dependencies.routes = routes(dependencies);
  dependencies.presenters = Presenters(dependencies);

  return App({schemas, ...dependencies});
};

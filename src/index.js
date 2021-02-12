'use strict';

const App = require('./App');
const Routes = require('./Routes');
const schemas = require('./schemas');
const Middlewares = require('./Middlewares');
const Controllers = require('./Controllers');
const DB = require('./DB');
const models = require('./DB/models');
const Services = require('./Services');
const Views = require('./Views');

module.exports = function (dependencies) {
  const db = DB(dependencies.config.database, models);
  const views = Views(dependencies);
  const services = Services({db, ...dependencies});
  const middlewares = Middlewares({services, ...dependencies});
  const controllers = Controllers({services, views, ...dependencies});
  const routes = Routes({middlewares, controllers, schemas, ...dependencies});

  const app = App({middlewares, routes, ...dependencies, views});

  return app;
};

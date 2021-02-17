'use strict';

const App = require('./App');
const Routes = require('./Routes');
const schemas = require('./schemas');
const Middlewares = require('./Middlewares');
const Controllers = require('./Controllers');
const DB = require('./DB');
const models = require('./DB/models');
const Services = require('./Services');
const Util = require('./Util');
const Presenters = require('./Presenters');

const buildAppDependencies = function (dependencies) {
  const util = Util(dependencies);
  const db = DB({...dependencies, models, util});
  const presenters = Presenters(dependencies);
  const services = Services({db, ...dependencies});
  const middlewares = Middlewares({services, ...dependencies});
  const controllers = Controllers({services, ...dependencies});
  const routes = Routes({middlewares, controllers, schemas, ...dependencies});

  return {middlewares, services, db, routes, presenters, util, models, ...dependencies}
};

const buildApp = function(appDependencies) {
  return App(appDependencies);
};

module.exports = {
  buildAppDependencies,
  buildApp
};

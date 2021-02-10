'use strict';

module.exports = function(config) {
  const App = require('./App');
  const Routes = require('./Routes');
  const schemas = require('./schemas');
  const middlewares = require('./middlewares');
  const Controllers = require('./Controllers');
  const DB = require('./DB');
  const models = require('./DB/models');
  const Services = require('./Services');

  const db = DB(config.database, models);
  const services = Services({db, config});
  const controllers = Controllers({services});
  const routes = Routes({middlewares, controllers, schemas});

  return App(routes);
};


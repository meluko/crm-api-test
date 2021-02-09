'use strict';

const {server: {port}} = require('config');
const App = require('./src/App');
const Routes = require('./src/Routes');
const schemas = require('./src/Schemas');
const middlewares = require('./src/Middlewares');
const Controllers = require('./src/Controllers');

const services = {};  // ToDo: No service implemented
const controllers = Controllers({services});
const routes = Routes({middlewares, controllers, schemas});
const app = App(routes);

app.listen(port, () => {
  console.info(`Server listening at port ${port}`);
});

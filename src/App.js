'use strict';

module.exports = function ({middlewares, routes, presenters, lib}) {
  const app = lib.express();
  app.set('trust proxy', true);

  app.use(middlewares.httpContext);
  app.use('/api/v1', middlewares.validateToken);
  app.use('/api/v1/user', middlewares.adminAccess);
  app.use(middlewares.jsonBodyParser);
  app.use(middlewares.expressBunyanLogger);

  app.engine('html', presenters.html);
  app.engine('js', presenters.js);
  app.set('views', lib.path.join(__dirname,'Presenters/templates'));
  app.set('view engine', 'html');

  routes(app);

  return app;
};

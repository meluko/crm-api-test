'use strict';

module.exports = dependencies => app => {
  require('./customer')(dependencies)(app);
  require('./user')(dependencies)(app);
  require('./image')(dependencies)(app);
  require('./auth')(dependencies)(app);
  require('./ping')(dependencies)(app);
};

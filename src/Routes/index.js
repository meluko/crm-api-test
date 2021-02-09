'use strict';

module.exports = dependencies => app => {
  require('./customer')(dependencies)(app);
  require('./user')(dependencies)(app);
};

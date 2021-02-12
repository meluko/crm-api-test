'use strict';

module.exports = function(db) {
  return {
    user: require('./User')(db),
    customer: require('./Customer')(db),
    imageMeta: require('./ImageMeta')(db),
  };
};

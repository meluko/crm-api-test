'use strict';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

const trim = it => it.trim();
const identity = it => it;
const split = it => it.split(':').map(trim);

module.exports = (query = {}) => {
  let {offset, limit, order} = query;
  offset = parseInt(offset) || DEFAULT_OFFSET;
  limit = parseInt(limit) || DEFAULT_LIMIT;
  if (!Array.isArray(order)) {
    order = [order].filter(identity);
  }
  order = (order).map(split);

  return {offset, limit, order};
};


'use strict';

const SequelizeBuilder = require('sequelize');

module.exports = function (config) {
  const {
    host,
    port,
    database,
    username,
    password,
    dialect
  } = config;
  const url = `mysql://${username}:${password}@${host}:${port}/${database}`;
  const options = {
    url,
    dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    hooks: true,
    define: {
      freezeTableName: true
    },
    logging: false
  };

  const sequelize = new SequelizeBuilder(database, username, password, options);

  return {
    sequelize,
    Sequelize: SequelizeBuilder
  };
};

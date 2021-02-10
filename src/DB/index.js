'use strict';

const SequelizeBuilder = require('./SequelizeBuilder');

module.exports = function (config, models) {
  const {
    sequelize,
    Sequelize
  } = SequelizeBuilder(config);

  models = Object
    .entries(models)
    .reduce((models, [key, model]) => {
      return {...models, [key]: model(sequelize, Sequelize.DataTypes)};
    }, {});

  Object
    .values(models)
    .forEach(model => model.associate(models));

  return {
    sequelize,
    ...models
  };
};

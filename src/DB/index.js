'use strict';

const SequelizeBuilder = require('./SequelizeBuilder');

module.exports = function (dependencies) {
  const {
    config: {database},
  } = dependencies;
  const {
    sequelize,
    Sequelize
  } = SequelizeBuilder(database);

  const models = Object
    .entries(dependencies.models)
    .reduce((models, [key, model]) => {
      return {...models, [key]: model(dependencies)(sequelize, Sequelize.DataTypes)};
    }, {});

  Object
    .values(models)
    .forEach(model => model.associate(models));

  return {
    sequelize,
    ...models
  };
};

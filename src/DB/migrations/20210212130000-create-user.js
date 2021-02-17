'use strict';

const {migrationFields} = require('../models/auditoryFields');
const tableName = 'user';

module.exports = {
  up: (queryInterface, {DataTypes, literal}) => {
    const auditoryFields = migrationFields(literal, DataTypes);
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      githubId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      githubLogin: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      ...auditoryFields
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable(tableName);
  }
};

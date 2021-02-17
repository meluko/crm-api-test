'use strict';

const {migrationFields} = require('../models/auditoryFields');
const tableName = 'imageMeta';

module.exports = {
  up: (queryInterface, { DataTypes, literal }) => {
    const auditoryFields = migrationFields(literal, DataTypes);
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ...auditoryFields
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable(tableName);
  }
};

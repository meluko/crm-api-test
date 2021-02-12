'use strict';

const {migrationFields} = require('../models/AuditoryFields');
const tableName = 'accessToken';

module.exports = {
  up: (queryInterface, { DataTypes, literal }) => {
    const auditoryFields = migrationFields(literal, DataTypes);
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false
      },
      githubId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      ...auditoryFields
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable(tableName);
  }
};

'use strict';

const tableName = 'imageMeta';

module.exports = {
  up: (queryInterface, { DataTypes }) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { timestamps: false });
  },

  down: queryInterface => {
    return queryInterface.dropTable(tableName);
  }
};

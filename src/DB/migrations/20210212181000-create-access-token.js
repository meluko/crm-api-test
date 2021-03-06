'use strict';

const tableName = 'accessToken';

module.exports = {
  up: (queryInterface, { DataTypes }) => {
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
        onDelete: 'CASCADE',
        allowNull: false
      },
      expiresAt: {
        type: DataTypes.DATE(3),
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable(tableName);
  }
};

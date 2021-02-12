'use strict';

const tableName = 'customer';

module.exports = {
  up: (queryInterface, { DataTypes }) => {
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
      imageMetaId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'imageMeta',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    }, { timestamps: false });
  },

  down: queryInterface => {
    return queryInterface.dropTable(tableName);
  }
};

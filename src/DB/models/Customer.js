'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
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
      primaryKey: true,
      references: {
        model: 'imageMeta',
        key: 'id'
      }
    }
  }, {timestamps: false});


  Customer.associate = ({ImageMeta}) => {
    Customer.belongsTo(ImageMeta, {
      foreignKey: {
        name: 'imageMetaId',
        allowNull: true
      },
      onDelete: 'CASCADE'
    });
  };

  return Customer;
};

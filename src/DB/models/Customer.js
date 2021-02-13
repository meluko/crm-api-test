'use strict';

const {modelFields} = require('./auditoryFields');

module.exports = (sequelize, DataTypes) => {
  const auditoryFields = modelFields(DataTypes);
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
    },
    ...auditoryFields
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

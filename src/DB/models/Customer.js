'use strict';

const {modelFields, associateToUser} = require('./auditoryFields');

module.exports = dependencies => (sequelize, DataTypes) => {
  const {
    bindAuditHooks
  } = dependencies.util;
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

  bindAuditHooks(Customer);

  Customer.associate = ({ImageMeta, User}) => {
    Customer.imageMeta = Customer.belongsTo(ImageMeta, {
      foreignKey: {
        name: 'imageMetaId',
        allowNull: true
      },
      onDelete: 'CASCADE'
    });
    associateToUser(User)(Customer);
  };

  return Customer;
};

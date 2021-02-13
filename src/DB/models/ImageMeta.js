'use strict';

const {modelFields, associateToUser} = require('./auditoryFields');

module.exports = dependencies =>  (sequelize, DataTypes) => {
  const {
    bindAuditHooks
  } = dependencies.util;
  const auditoryFields = modelFields(DataTypes);
  const ImageMeta = sequelize.define('imageMeta', {
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
  }, {timestamps: false});

  bindAuditHooks(ImageMeta);

  ImageMeta.associate = ({User}) => {
    associateToUser(User)(ImageMeta);
  };

  return ImageMeta;
};

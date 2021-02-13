'use strict';

const {modelFields, associateToUser} = require('./auditoryFields');

module.exports = (sequelize, DataTypes) => {
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

  ImageMeta.associate = ({User}) => {
    associateToUser(User)(ImageMeta);
  };

  return ImageMeta;
};

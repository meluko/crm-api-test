'use strict';

const {modelFields} = require('./auditoryFields');

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

  ImageMeta.associate = () => {};

  return ImageMeta;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
  const ImageMeta = sequelize.define('imageMeta', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {timestamps: false});

  ImageMeta.associate = () => {};

  return ImageMeta;
};

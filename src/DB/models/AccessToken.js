'use strict';

const {modelFields} = require('./AuditoryFields');

module.exports = (sequelize, DataTypes) => {
  const auditoryFields = modelFields(DataTypes);
  const AccessToken = sequelize.define('accessToken', {
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
    ...auditoryFields
  });

  AccessToken.associate = ({User}) => {
    AccessToken.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return AccessToken;
};

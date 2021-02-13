'use strict';

const {modelFields, associateToUser} = require('./auditoryFields');

module.exports = dependencies =>  (sequelize, DataTypes) => {
  const {
    bindAuditHooks
  } = dependencies.util;
  const auditoryFields = modelFields(DataTypes);
  const User = sequelize.define('user', {
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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    githubId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    githubLogin: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    ...auditoryFields
  }, { timestamps: false });

  bindAuditHooks(User);

  User.associate = ({AccessToken}) => {
    User.accessTokens = User.hasMany(AccessToken);
    associateToUser(User)(User);
  };

  return User;
};

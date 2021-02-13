'use strict';

const {modelFields, associateToUser} = require('./auditoryFields');

module.exports = (sequelize, DataTypes) => {
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

  User.associate = ({AccessToken, Customer}) => {
    User.accessTokens = User.hasMany(AccessToken);
    associateToUser(User)(User);
  };

  return User;
};

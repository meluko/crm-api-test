'use strict';

module.exports = (sequelize, DataTypes) => {
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
    }
  }, { timestamps: false });

  User.associate = () => {};

  return User;
};

'use strict';

module.exports = () => (sequelize, DataTypes) => {
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
    expiresAt: {
      type: DataTypes.DATE(3),
      allowNull: false
    }
  }, {timestamps: false});

  AccessToken.associate = ({User}) => {
    AccessToken.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return AccessToken;
};

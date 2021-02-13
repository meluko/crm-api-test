'use strict';

const migrationFields = function (literal, DataTypes) {
  return {
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
      allowNull: false,
      field: 'updatedAt'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true
    }
  };
};

const modelFields = function (DataTypes) {
  return {
    createdAt: DataTypes.DATE(3),
    updatedAt: DataTypes.DATE(3)
  };
};

const associateToUser = UserModel => Model =>  {
  console.log('MAYBE THESE LINES ARE NEEDED');
  //  UserModel.createdCustomers = UserModel.hasMany(Model);
  //  UserModel.updatedCustomers = UserModel.hasMany(Model);
  Model.createdBy = Model.belongsTo(UserModel, {
    foreignKey: {
      name: 'createdBy',
      allowNull: true
    },
    onDelete: 'CASCADE'
  });
  Model.updatedBy = Model.belongsTo(UserModel, {
    foreignKey: {
      name: 'updatedBy',
      allowNull: true
    },
    onDelete: 'CASCADE'
  });
};

module.exports = {
  migrationFields,
  modelFields,
  associateToUser
};

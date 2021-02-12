'use strict';

const migrationFields = function (literal, DataTypes) {
  return {
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: literal('CURRENT_TIMESTAMP(3)'),
      field: 'createdAt',
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
      field: 'updatedAt',
    },
  };
};

const modelFields = function (DataTypes) {
  return {
    createdAt: DataTypes.DATE(3),
    updatedAt: DataTypes.DATE(3)
  };
};

module.exports = {
  migrationFields,
  modelFields
};

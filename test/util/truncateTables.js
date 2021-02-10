'use strict';

module.exports = ({sequelize}) => async tables => {
  for (let table of tables) {
    await sequelize.transaction(async transaction => {
      const options = { transaction };
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
      await sequelize.query(`TRUNCATE TABLE ${table}`, options);
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
    });
  }
};

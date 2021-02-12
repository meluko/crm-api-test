'use strict';

module.exports = function (db) {
  const {User} = db;

  const get = function (id) {
    return User.findOne({where: {id}});
  };

  const find = function() {
    return User.findAndCountAll({});
  };

  const create = function(userData) {
    return User.create(userData);
  };

  const update = async function (id, userData) {
    const options = {where: {id}, plain: true};
    const [affectedRows] = await User.update(userData, options);

    if (!affectedRows) {
      return null;
    }

    return {id, ...userData};
  };

  const destroy = function(id) {
    return User.destroy({where: {id}});
  };

  return {
    get,
    find,
    create,
    update,
    destroy
  };
};

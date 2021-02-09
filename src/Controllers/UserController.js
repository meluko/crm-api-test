'use strict';

module.exports = function(dependencies) {
  const {userService} = dependencies.services;

  const list = function (req, res) {
    const users = userService.list();
    res.status(200).json({
      count: users.length,
      rows: users
    });
  };

  const create = function (req, res) {
    const user = userService.create(req.body);
    res.status(200).json(user);
  };

  const get = function (req, res) {
    const {userId} = req.params;
    const user = userService.get(userId);
    if (!user) {
      return res.status(404).send('Not Found');
    }
    res.status(200).json(user);
  };

  const update = function (req, res) {
    const {userId} = req.params;
    const user = userService.get(userId);
    if (!user) {
      return res.status(404).send('Not Found');
    }
    userService.update(userId, req.body);
    res.status(200).json(user);
  };

  const remove = function (req, res) {
    const {userId} = req.params;
    const user = userService.get(userId);
    if (!user) {
      return res.status(404).send('Not Found');
    }
    userService.remove(userId);
    res.status(200).json(user);
  };

  return {
    list,
    create,
    get,
    update,
    remove
  };

};

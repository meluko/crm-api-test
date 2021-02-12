'use strict';

module.exports = function(dependencies) {
  const {userService} = dependencies.services;

  const list = async function (req, res) {
    const users = await userService.find();
    res.status(200).json({
      count: users.length || 0,
      rows: users
    });
  };

  const create = async function (req, res) {
    const user = await userService.create(req.body);
    res.status(200).json(user);
  };

  const get = async function (req, res) {
    const {userId} = req.params;
    const user = await userService.get(userId);
    if (!user) {
      return res.status(404).send('Not Found');
    }
    res.status(200).json(user);
  };

  const update = async function (req, res) {
    const {userId} = req.params;
    const user = await userService.get(userId);
    if (!user) {
      return res.status(404).send('Not Found');
    }
    await userService.update(userId, req.body);
    res.status(200).json(user);
  };

  const remove = async function (req, res) {
    const {userId} = req.params;
    const user = await userService.get(userId);
    if (!user) {
      return res.status(404).send('Not Found');
    }
    await userService.destroy(userId);
    res.status(200).json({});
  };

  return {
    list,
    create,
    get,
    update,
    remove
  };

};
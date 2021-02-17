'use strict';

module.exports = function(dependencies) {
  const {userService} = dependencies.services;

  const list = async function (req, res) {
    const users = await userService.find(req.query);
    res.render('UserListPresenter.js', users);
  };

  const create = async function (req, res) {
    const user = await userService.create(req.body);
    res.render('UserPresenter.js', user);
  };

  const get = async function (req, res) {
    const {userId} = req.params;
    const user = await userService.get(userId);
    if (!user) {
      return res.status(404).send('Not Found');
    }
    res.render('UserPresenter.js', user);
  };

  const update = async function (req, res) {
    const {userId} = req.params;
    const user = await userService.get(userId);
    if (!user) {
      return res.status(404).send('Not Found');
    }
    const updatedUser = await userService.update(user, req.body);
    res.render('UserPresenter.js', updatedUser);
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

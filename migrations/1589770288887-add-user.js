'use strict'

const { UserModel } = require('../model/users');

const user = require('../data/1589770288887-add-user');
const User = new UserModel(user);

module.exports.up = async function () {
  await User.validate();
  await UserModel.create(user);
}

module.exports.down = async function () {
  await User.validate();
  await UserModel.deleteOne(user);
}

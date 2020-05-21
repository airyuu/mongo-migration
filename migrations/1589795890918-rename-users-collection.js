'use strict'

const { UserModel, NewUserModel } = require('../model/users');

module.exports.up = async function () {
  await UserModel.collection.rename('newUsers');
}

module.exports.down = async function () {
  await NewUserModel.collection.rename('users');
}

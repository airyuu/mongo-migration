'use strict'

const { UserModel } = require('../model/users');

const user = {
  firstName: 'kevin',
  lastName: 'w'
};

module.exports.up = async function () {
  await UserModel.create(user);
}

module.exports.down = async function () {
  await UserModel.deleteOne(user);
}

'use strict'

const db = require('../lib/db');
const { UserModel } = require('../model/users');

const user = {
  firstName: 'kevin',
  lastName: 'w'
};

module.exports.up = async function () {
  await UserModel.create(new UserModel(user));
}

module.exports.down = async function () {
  await UserModel.deleteOne(user);
}

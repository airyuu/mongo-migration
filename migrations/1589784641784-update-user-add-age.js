'use strict'

const { UserModel } = require('../model/users');

const query = {
  firstName: {
    $exists: true
  }
}

module.exports.up = async function () {
  await UserModel.updateMany(query, { $set: { age: 18 } });
}

module.exports.down = async function () {
  await UserModel.updateMany(query, { $unset: { age: 1 } });
}

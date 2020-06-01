'use strict'

const { UserModel } = require('../model/users');

const age = require('../data/1589784641784-update-user-add-age');

const query = {
  firstName: {
    $exists: true
  }
}

module.exports.up = async function () {
  await UserModel.updateMany(query, { $set: age });
}

module.exports.down = async function () {
  await UserModel.updateMany(query, { $unset: age });
}

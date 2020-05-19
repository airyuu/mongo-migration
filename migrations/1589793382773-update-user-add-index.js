'use strict'

const db = require('../lib/db');
const { UserModel } = require('../model/users');

module.exports.up = async function () {
  await UserModel.collection.createIndex(
    { firstName: 1, lastName: 1 },
    { unique: true }
  )
}

module.exports.down = async function () {
  await UserModel.collection.dropIndex(
    { firstName: 1, lastName: 1 },
    { unique: true }
  )
}

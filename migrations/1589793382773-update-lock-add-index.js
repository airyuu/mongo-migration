'use strict'

const db = require('../lib/db');
const { LockModel } = require('../model/locks');

module.exports.up = async function () {
  await LockModel.collection.createIndex(
    { LockID: 1, LockName: 1 },
    { unique: true }
  )
}

module.exports.down = async function () {
  await LockModel.collection.dropIndex(
    { LockID: 1, LockName: 1 },
    { unique: true }
  )
}

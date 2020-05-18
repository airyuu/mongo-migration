'use strict'

const db = require('../lib/db');
const { LockModel } = require('../model/locks');

const query = {
  LockID: {
    $exists: true
  }
}

module.exports.up = async function () {
  await LockModel.updateMany(query, { $set: { Type: 1 } });
}

module.exports.down = async function () {
  await LockModel.updateMany(query, { $unset: { Type: 1 } });
}

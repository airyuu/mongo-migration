'use strict'

const db = require('../lib/db');
const { LockModel, newLockModel } = require('../model/locks');

module.exports.up = async function () {
  await LockModel.collection.rename('newLocks');
}

module.exports.down = async function () {
  await newLockModel.collection.rename('locks');
}

'use strict'

const db = require('../lib/db');
const { LockModel } = require('../model/locks');

const lock = {
  LockID: '123',
  LockName: 'lock1'
};

module.exports.up = async function () {
  await LockModel.create(new LockModel(lock));
}

module.exports.down = async function () {
  await LockModel.deleteOne(lock);
}

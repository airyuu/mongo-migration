'use strict'

const { UserModel } = require('../model/users');
const { IndexModel } = require('../model/index');

const index = require('../data/1589793382773-update-user-add-index');
const Index = new IndexModel(index);

module.exports.up = async function () {
  await Index.validate();
  UserModel.collection.createIndex(Index.fields, Index.options);
}

module.exports.down = async function () {
  await Index.validate();
  UserModel.collection.dropIndex(Index.fields, Index.options);
}

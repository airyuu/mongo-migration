'use strict'

const { assert } = require('chai');

const { UserModel } = require('../model/users');
const { up, down } = require('../migrations/1589793382773-update-user-add-index');

const index = require('../data/1589793382773-update-user-add-index');
const newIndexName = Object.keys(index.fields).join('_1_') + '_1';

describe('Migrate Up', () => {
  let userIndices = [];
  let newIndex;

  before(async () => {
    await up();
  });

  before(async () => {
    userIndices = await UserModel.listIndexes();
    newIndex = userIndices.find(({ name }) => name === newIndexName);
  });
  
  it('should set the unique index for users collection', () => {
    assert.lengthOf(userIndices, 2);
    assert.exists(newIndex);
    assert.nestedPropertyVal(newIndex, 'name', newIndexName);
    assert.nestedPropertyVal(newIndex, 'unique', true);
  });
});

describe('Migrate Down', () => {
  let userIndices = [];
  let newIndex;

  before(async () => {
    await down();
  });

  before(async () => {
    userIndices = await UserModel.listIndexes();
    newIndex = userIndices.find(({ name }) => name === newIndexName);
  });
  
  it('should unset the unique index for users collection', () => {
    assert.lengthOf(userIndices, 1);
    assert.isUndefined(newIndex);
  });
});

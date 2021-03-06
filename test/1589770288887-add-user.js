'use strict'

const { assert } = require('chai');

const { UserModel } = require('../model/users');
const { up, down } = require('../migrations/1589770288887-add-user');

const user = require('../data/1589770288887-add-user');

describe('Migrate Up', () => {
  let userDoc;

  before(async () => {
    await up();
  });

  before(async () => {
    userDoc = await UserModel.findOne(user);
  });
  
  it('should create a document in users collection', () => {
    assert.exists(userDoc);
    assert.nestedPropertyVal(userDoc, 'firstName', user.firstName);
    assert.nestedPropertyVal(userDoc, 'lastName', user.lastName);
  });
});

describe('Migrate Down', () => {
  let userDoc;

  before(async () => {
    await down();
  });

  before(async () => {
    userDoc = await UserModel.findOne(user);
  });
  
  it('should remove the created document from the users collections', () => {
    assert.isNull(userDoc);
  });
});

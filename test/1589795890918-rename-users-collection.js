'use strict'

const { assert } = require('chai');
const faker = require('faker');

const { UserModel, NewUserModel } = require('../model/users');
const { up, down } = require('../migrations/1589795890918-rename-users-collection');

const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.random.number(),
};

describe('Migrate Up', () => {
  let userDoc;
  let newUserDoc;

  before(async () => {
    await UserModel.create(user);
  });

  before(async () => {
    await up();
  });

  before(async () => {
    userDoc = await UserModel.findOne(user);
    newUserDoc = await NewUserModel.findOne(user);
  });
  
  it('should rename the users collection to newUsers', () => {
    assert.isNull(userDoc);
    assert.exists(newUserDoc);
    assert.nestedPropertyVal(newUserDoc, 'firstName', user.firstName);
    assert.nestedPropertyVal(newUserDoc, 'lastName', user.lastName);
    assert.nestedPropertyVal(newUserDoc, 'age', user.age);
  });
});

describe('Migrate Down', () => {
  let userDoc;
  let newUserDoc;

  before(async () => {
    await down();
  });

  before(async () => {
    userDoc = await UserModel.findOne(user);
    newUserDoc = await NewUserModel.findOne(user);
  });
  
  it('should rollback the newUsers collection to users', () => {
    assert.isNull(newUserDoc);
    assert.exists(userDoc);
    assert.nestedPropertyVal(userDoc, 'firstName', user.firstName);
    assert.nestedPropertyVal(userDoc, 'lastName', user.lastName);
    assert.nestedPropertyVal(userDoc, 'age', user.age);
  });
});

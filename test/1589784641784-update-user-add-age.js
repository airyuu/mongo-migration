'use strict'

const { assert } = require('chai');
const faker = require('faker');

const { UserModel } = require('../model/users');
const { up, down } = require('../migrations/1589784641784-update-user-add-age');

const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};

const age = 18;

describe('Migrate Up', () => {
  let userDoc;

  before(async () => {
    await UserModel.create(user);
  });

  before(async () => {
    await up();
  });

  before(async () => {
    userDoc = await UserModel.findOne(user);
  });
  
  it('should set a field age in users collection', () => {
    assert.exists(userDoc);
    assert.nestedPropertyVal(userDoc, 'firstName', user.firstName);
    assert.nestedPropertyVal(userDoc, 'lastName', user.lastName);
    assert.nestedPropertyVal(userDoc, 'age', age);
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
  
  it('should unset the field age in users collection', () => {
    assert.exists(userDoc);
    assert.nestedPropertyVal(userDoc, 'firstName', user.firstName);
    assert.nestedPropertyVal(userDoc, 'lastName', user.lastName);
    assert.nestedPropertyVal(userDoc, 'age', undefined);
  });
});

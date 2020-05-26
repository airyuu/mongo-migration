'use strict'

const migrate = require('migrate');

const FileStore = require('./lib/store');

migrate.load({
  stateStore: new FileStore()
}, function (err, set) {
  if (err) {
    throw err;
  }
  set.up(function (err) {
    if (err) {
      throw err;
    }
    console.log('migrations successfully ran');
    process.exit(0);
  });
});
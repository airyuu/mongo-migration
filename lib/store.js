'use strict'

const { init } = require('./mongo');
const { MigrationModel } = require('../model/migrations');

class FileStore {
  constructor() {
    init();
  }

  async load (fn) {
    let store = await MigrationModel.findOne({});

    if (!store) {
      return fn(null, {});
    }
  
    store = JSON.parse(JSON.stringify(store));

    // eslint-disable-next-line no-prototype-builtins
    if(!store.hasOwnProperty('lastRun') || !store.hasOwnProperty('migrations')) {
      return fn(new Error('Invalid store file'));
    }
  
    return fn(null, store);
  }

  async save (set, fn) {
    const result = await MigrationModel.replaceOne(
      {},
      {
        lastRun: set.lastRun,
        migrations: set.migrations.filter(m => Boolean(m.timestamp))
      },
      {
        upsert: true,
      }
    );
  
    return fn(null, result);
  }
}

module.exports = FileStore;
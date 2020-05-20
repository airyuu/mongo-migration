'use strict'

const { init } = require('../lib/db');

const database = 'sample-test';

let connection;

before('init database', async () => {
  connection = init({ database });
  console.log(`Our Current Database Name : ${connection.db.databaseName}`);
});

after('teardown database', async () => {
  connection.db.dropDatabase();
  console.log(`${connection.db.databaseName} database dropped.`);
});


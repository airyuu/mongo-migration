'use strict'

const { init } = require('../lib/mongo');

const database = 'sample-test';

let connection;

before('init database', async () => {
  connection = init({ database });
});

after('teardown database', async () => {
  connection.db.dropDatabase();
  console.log(`${connection.name} database dropped.`);

  connection.close();
  console.log('connection closed');
});


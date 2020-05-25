'use strict'

const { init } = require('../lib/mongo');

let connection;

before('init database', async () => {
  connection = init();
});

after('teardown database', async () => {
  connection.db.dropDatabase();
  console.log(`${connection.name} database dropped.`);

  connection.close();
  console.log('connection closed');
});


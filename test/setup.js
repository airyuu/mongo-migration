'use strict'

const config = require('dotenv').config();
const { init } = require('../lib/mongo');

const { DB_TEST_NAME } = config.parsed;

let connection;

before('init database', async () => {
  connection = init({ database: DB_TEST_NAME });
});

after('teardown database', async () => {
  connection.db.dropDatabase();
  console.log(`${connection.name} database dropped.`);

  connection.close();
  console.log('connection closed');
});


'use strict'

const mongoose = require('mongoose');
const config = require('dotenv').config();

const env = process.env.NODE_ENV || 'local';
const { DB_HOST: host, DB_PORT: port, DB_NAME: name, DB_USER: username, DB_PASS: passwaord } = config.parsed;

/**
 * Initialize the mongodb client
 *
 * @param {Object} options mongodb initialize options
 * @param {String} dbName database name
 * @returns {Object} connection
 */
function init(options = {}) {
  const dbName = options.dbName || name;

  const mongoDB = ['local', 'test'].includes(env) ?
    `mongodb://${host}:${port}/${dbName}`:
    `mongodb://${username}:${passwaord}@${host}:${port}/${dbName}`;

  //Set up mongodb connection
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false
  });
  
  //Get the default connection
  const db = mongoose.connection;
  
  //Bind connection to error event
  db.on('error', function (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });
  
  //Bind connection to open event
  db.on('open', function () {
    console.log(`${env} environment: Connected to mongo server with the database ${db.name}`);
  });

  process.on('uncaughtException', gracefulExit)

  return db;
}

/**
 * Close the mongodb client
 *
 * @returns {undefined}
 */
function disconnect() {
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
}

/**
 * Exit mongoDB connection
 *
 * @returns {undefined}
 */
function gracefulExit() { 
  mongoose.connection.close(function () {
    console.log('Mongodb closed');
    process.exit(0);
  });
}

module.exports = {
  init,
  disconnect,
}
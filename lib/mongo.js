'use strict'

const config = require('config');
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';

const { host, port, dbName } = config.get('dbConfig');
const mongoDB = `mongodb://${host}:${port}/${dbName}`;

/**
 * Initialize the mongodb client
 *
 * @returns {Object} connection
 */
function init() {
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
    console.log(`${env} environment: Connected to mongo server with the database ${db.db.databaseName}`);
  });

  return db;
}

/**
 * Close the mongodb client
 *
 * @returns {undefined}
 */
function disconnect() {
  const gracefulExit = function() { 
    mongoose.connection.close(function () {
      console.log('Mongodb closed');
      process.exit(0);
    });
  }
  
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
}

module.exports = {
  init,
  disconnect,
}
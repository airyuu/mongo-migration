const mongoose = require('mongoose');

function init(options = {}) {
  const {
    url = '127.0.0.1',
    port = 27017,
    database = 'sample'
  } = options;
  
  //Set up default mongoose connection
  const mongoDB = `mongodb://${url}:${port}/${database}`;

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
    console.log(`Connected to mongo server with the database ${db.db.databaseName}`);
  });

  return db;
}

module.exports.init = init;
// module.exports = init();

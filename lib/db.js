const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017/sample';
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
  console.log('Connected to mongo server');
});

module.exports = db;
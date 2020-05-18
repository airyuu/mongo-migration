//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/sample';
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
  console.error('MongoDB connection error: ', err);
  process.exit(1);
});

db.on('open', function (ref) {
  console.log('Connected to mongo server');
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names); // [{ name: 'collection' }]
    // module.exports.Collection = names;
  });
})

module.exports = db;
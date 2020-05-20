const mongoose = require('mongoose');

const { Schema } = mongoose;

const MigrationSchema = new Schema({
  lastRun: String,
  migrations: [
    {
      title: String,
      timestamp: Date,
    }
  ],
});

const MigrationModel = mongoose.model('migrations', MigrationSchema, 'migrations');

module.exports = {
  MigrationModel,
}
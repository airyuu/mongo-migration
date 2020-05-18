const mongoose = require('mongoose');

const { Schema } = mongoose;

const LockSchema = new Schema({
  LockID: String,
  LockName: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const LockModel = mongoose.model('locks', LockSchema, 'locks');
const newLockModel = mongoose.model('locks', LockSchema, 'newLocks');

module.exports = {
  LockModel,
  newLockModel,
}
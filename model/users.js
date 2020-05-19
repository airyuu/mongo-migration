const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model('users', UserSchema, 'users');
const NewUserModel = mongoose.model('users', UserSchema, 'newUsers');

module.exports = {
  UserModel,
  NewUserModel,
}
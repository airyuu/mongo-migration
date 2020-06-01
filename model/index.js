const mongoose = require('mongoose');

const { Schema } = mongoose;

const IndexSchema = new Schema({
  fields: { type: Object, required: true },
  options: Object,
});

const IndexModel = mongoose.model('indices', IndexSchema);

module.exports = {
  IndexModel
}
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cabinSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Cabin', cabinSchema);

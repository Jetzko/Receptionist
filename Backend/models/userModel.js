const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    maxLength: 8,
    minLength: 8,
  },
  phone: {
    type: String,
    match: /^\d+$/,
  },
  nationality: String,
  languages: [String],
  description: String,
});

module.exports = mongoose.model('User', userSchema);

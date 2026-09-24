const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cabinSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
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
  users: {
    owner_id: {
      type: String,
      required: true,
    },
    admins_id: [
      {
        type: String,
      },
    ],
    collaborators_id: [
      {
        type: String,
      },
    ],
  },
  reviews: [
    {
      type: String,
    },
  ],
  rating: {
    type: String,
  },
});

module.exports = mongoose.model('Cabin', cabinSchema);

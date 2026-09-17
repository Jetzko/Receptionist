const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  created_at: {
    type: Date,
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  _cabinId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  _guestId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  numGuests: {
    type: Number,
    require: true,
  },
  state: {
    type: String,
  },
  note: String,
});

module.exports = mongoose.model('Booking', bookingSchema);

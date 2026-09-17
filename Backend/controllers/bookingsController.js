'use strict';

const mongoose = require('mongoose');
const dateFNS = require('date-fns');

const Booking = require('../models/bookingModel');

const formatDate = function (date = Date.now()) {
  const formattedDate = dateFNS.format(date, 'HH:mm dd MMM y');

  return formattedDate;
};

// get all
const getAllBookings = async (req, res) => {};

// get
const getBooking = async (req, res) => {};

// post
const createBooking = async (req, res) => {
  const {
    startDate = formatDate(startDate),
    endDate = formatDate(endDate),
    numGuests,
    _cabinId,
    _guestId,
    state = 'requested',
    note = '',
  } = req.body;

  const created_at = formatDate();

  if (!startDate || !endDate || numGuests)
    return res
      .status(400)
      .json({ error: 'Please compile all requested fields.' });

  if (!mongoose.Types.ObjectId.isValid(_cabinId))
    return res.status(404).json({ error: '_cabinID not Valid.' });

  if (!mongoose.Types.ObjectId.isValid(_guestId))
    return res.status(404).json({ error: '_guestID not Valid.' });

  try {
    const booking = await Booking.create({
      created_at,
      startDate,
      endDate,
      numGuests,
      _cabinId,
      _guestId,
      state,
      note,
    });

    res.status(200).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// patch
const updateBooking = async (req, res) => {};

// delete
const deleteBooking = async (req, res) => {};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};

'use strict';

const express = require('express');
const bookingsRouter = express.Router();

const { createBooking } = require('../controllers/bookingsController');

bookingsRouter.post('/', createBooking);

module.exports = bookingsRouter;

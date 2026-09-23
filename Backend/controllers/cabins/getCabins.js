'use strict';

const mongoose = require('mongoose');
const Cabin = require('../../models/cabinModel');
const User = require('../../models/userModel');

// get all
const getAllCabins = async (req, res) => {
  try {
    const cabins = await Cabin.find({});

    res.status(200).json(cabins);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get
const getCabin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'ID not valid' });

  try {
    const cabin = await Cabin.findById(id);
    res.status(200).json(cabin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllCabins,
  getCabin,
};

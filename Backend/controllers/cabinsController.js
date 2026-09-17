'use strict';

const mongoose = require('mongoose');
const Cabin = require('../models/cabinModel');

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
    res.status(400).json(err.message);
  }
};

// post
const createCabin = async (req, res) => {
  const { name, price, address, description = '', status = '' } = req.body;

  let emptyFields = [];
  if (!name) emptyFields.push('name');
  if (!price) emptyFields.push('price');
  if (!address) emptyFields.push('address');

  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: 'Plaese compile all requested fields.' });

  try {
    const cabin = await Cabin.create({
      name,
      price,
      address,
      status,
      description,
    });
    res.status(200).json(cabin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// patch
const updateCabin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'ID not valid' });

  try {
    const cabin = await Cabin.findByIdAndUpdate(
      {
        _id: id,
      },
      { ...req.body },
    );
    res.status(200).json(cabin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// delete
const deleteCabin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'ID not valid' });

  try {
    const cabin = await Cabin.findByIdAndDelete(id);
    res.status(200).json(cabin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllCabins,
  getCabin,
  createCabin,
  updateCabin,
  deleteCabin,
};

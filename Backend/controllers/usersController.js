'use strict';

const mongoose = require('mongoose');
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {};

const getUser = async (req, res) => {};

const createUser = async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    phone = '',
    nationality = '',
    languages = [],
    description = '',
  } = req.body;

  try {
    const user = await User.create({
      name,
      surname,
      email,
      password,
      phone,
      nationality,
      languages,
      description,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

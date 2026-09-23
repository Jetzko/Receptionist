'use strict';

const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const signup = async (req, res) => {
  const {
    email,
    password,
    fullName,
    phone = '',
    nationality = '',
    languages = [],
    description = '',
  } = req.body;
  console.log(req.headers.authorization);

  try {
    const user = await User.signup(email, password, fullName);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const _id = user._id;
    const token = createToken(_id);

    res.status(200).json({ email, token, _id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'ID not valid' });

  try {
    const user = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      { ...req.body },
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'ID not valid' });

  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(`User ${id} successfully deleted!`);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'ID not valid' });

  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};

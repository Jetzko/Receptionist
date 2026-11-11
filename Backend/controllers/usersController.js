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
    nickname = '',
    phone = '',
    nationality = '',
    languages = [],
    description = '',
    users_id = {
      admins_id: [],
      collaorators_id: [],
    },
  } = req.body;

  try {
    await User.init();
    const user = await User.signup(
      email,
      password,
      fullName,
      nickname,
      phone,
      nationality,
      languages,
      description,
      users_id,
    );

    const _id = user._id;
    const token = createToken(user._id);

    res.status(200).json({ email, token, _id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const _id = user._id;
    const { users_id, fullName } = user;
    const token = createToken(_id);

    res.status(200).json({ email, token, _id, users_id, fullName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'ID not valid' });

  try {
    const userData = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      { ...req.body },
      { returnDocument: 'after' },
    );

    const { _id, fullName, nickname, users_id } = userData;

    const user = {
      _id,
      fullName,
      nickname,
      users_id,
    };

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
    const activeUser_id = req.user._id;
    const activeUser = await User.findById(activeUser_id);

    if (!activeUser)
      return res
        .status(404)
        .json({ error: 'Your user permissions are not valid.' });

    const { admins_id, collaborators_id } = activeUser.users_id;

    // const { admins_id, collaborators_id } = req.body;
    if (!admins_id || !collaborators_id)
      return res.status(404).json({ error: 'Please provide users IDs' });

    const admins = await User.find({ _id: { $in: admins_id } }).select(
      '-password',
    );
    const collaborators = await User.find({
      _id: { $in: collaborators_id },
    }).select('-password');

    if (
      admins.length !== admins_id.length ||
      collaborators.length !== collaborators_id.length
    )
      return res.status(404).json({ error: 'Users ID were not found.' });

    const users = {
      admins,
      collaborators,
    };

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
    const userData = await User.findById(id);
    if (userData === null)
      return res.status(404).json({ error: 'This user does not exists.' });

    const {
      _id,
      fullName,
      email,
      nickname,
      phone,
      languages,
      nationality,
      description,
      users_id,
    } = userData;

    const user = {
      _id,
      fullName,
      email,
      nickname,
      phone,
      languages,
      nationality,
      description,
      users_id,
    };

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserByNickname = async (req, res) => {
  const { nickname: _nickname } = req.params;

  try {
    const userData = await User.findOne({ nickname: _nickname });
    if (userData === null)
      return res.status(404).json({ error: 'This user does not exists.' });

    const {
      _id,
      nickname,
      fullName,
      phone,
      languages,
      nationality,
      description,
    } = userData;

    const user = {
      _id,
      nickname,
      fullName,
      phone,
      languages,
      nationality,
      description,
    };

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
  getUser,
  getAllUsers,
  getUserByNickname,
  updateUser,
  deleteUser,
};

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

function isValidFullName(fullname) {
  const trimmedName = validator.trim(fullname);

  if (!validator.isLength(trimmedName, { min: 2, max: 30 })) return false;

  if (!validator.matches(trimmedName, /^[a-zA-Zà-üÀ-Ü'\-\s]+$/u)) return false;

  return true;
}

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    // match: /^\d+$/,
  },
  nationality: String,
  languages: [String],
  description: String,
});

userSchema.statics.signup = async function (email, password, fullName) {
  // credential validations
  if (!email || !password || !fullName)
    throw Error('All fields must be filled!');
  if (!isValidFullName(fullName)) throw Error('This name format is not valid!');
  if (!validator.isEmail(email)) throw Error('Email is not valid!');
  if (!validator.isStrongPassword(password))
    throw Error('Password is not strong enough!');
  const alreadyExists = await this.findOne({ email });
  if (alreadyExists) throw Error('This Email is already in use.');

  // password encrypting
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, fullName });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error('All fields must be filled!');

  const user = await this.findOne({ email });
  if (!user) throw Error('Incorrect email.');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error('Incorrect password.');

  return user;
};

module.exports = mongoose.model('User', userSchema);

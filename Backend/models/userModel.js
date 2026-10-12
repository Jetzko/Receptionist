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
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    // match: /^\d+$/,
  },
  nationality: String,
  languages: [String],
  description: String,
});

async function generateNickname(fullName) {
  const nicknameBase = fullName
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .split(/\s+/)
    .join('');

  return nicknameBase;
}

userSchema.statics.signup = async function (email, password, fullName) {
  // credential validations
  if (!email || !password || !fullName)
    throw Error('All fields must be filled!');
  if (!isValidFullName(fullName)) throw Error('This name format is not valid!');
  if (!validator.isEmail(email)) throw Error('Email is not valid!');
  if (!validator.isStrongPassword(password))
    throw Error('Password is not strong enough!');
  const emailAlreadyExists = await this.findOne({ email });
  if (emailAlreadyExists) throw Error('This Email is already in use.');

  let i = 0;
  let nickname = '';
  const nicknameBase = await generateNickname(fullName);
  let nicknameCandidate = nicknameBase.concat(i);

  while (nickname === '') {
    const nicknameAlreadyExists = await this.findOne({
      nickname: nicknameCandidate,
    });

    if (nicknameAlreadyExists) {
      i++;
      nicknameCandidate = nicknameBase.concat(`-${i}`);
    } else {
      nickname = nicknameCandidate;
    }
  }

  // password encrypting
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, fullName, nickname });

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

const _ = require('lodash');
const config = require('../config');
const { User } = require('../models/user-model');
const AppError = require('../utils/app-error');
const tokenService = require('./token-service');
const userService = require('./user-service');

const register = async (payload) => {
  // check if email is already exists
  const isExists = await userService.getOneUser({ email: payload.email });
  console.log(isExists);
  if (isExists) {
    throw new AppError('Email is already exists.', 400);
  }

  // Save to the database
  const user = await userService.createNewUser(_.pick(payload, ['name', 'email', 'password']));

  // Get the email verification token
  const token = tokenService.generateRandomToken();

  await user.save({ validateBeforeSave: false });

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  const isMatch = await user?.correctPassword(password, user.password);

  if (!isMatch) {
    throw new AppError('Incorrect email or password.', 401);
  }

  return user;
};

module.exports = {
  register,
  login,
};

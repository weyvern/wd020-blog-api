import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/User.js';

export const signUp = asyncHandler(async (req, res) => {
  const {
    body: { name, email, password }
  } = req;
  if (!name || !email || !password)
    throw new ErrorResponse('Name, email and password are required', 400);
  const found = await User.findOne({ email });
  if (found) throw new ErrorResponse('User already exist', 403);
  const hash = await bcrypt.hash(password, 5);
  const { _id, name: username } = await User.create({ name, email, password: hash });
  const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: 3600 });
  res.json({ token });
});

export const signIn = asyncHandler(async (req, res) => {
  const {
    body: { email, password }
  } = req;
  if (!email || !password) throw new ErrorResponse('Email and password are required', 400);
  const found = await User.findOne({ email }).select('+password');
  if (!found) throw new ErrorResponse('User does not exist', 404);
  const { _id, name: username, password: hash } = found;
  const match = await bcrypt.compare(password, hash);
  if (!match) throw new ErrorResponse('Password is not correct', 401);
  const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: 3600 });
  res.json({ token });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

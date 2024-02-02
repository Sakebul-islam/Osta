import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (
    !userName ||
    !email ||
    !password ||
    userName === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All filled are required'));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashPassword,
  });
  try {
    const result = await newUser.save();
    res.json('Signup Successful');
  } catch (error) {
    next(error);
  }
};

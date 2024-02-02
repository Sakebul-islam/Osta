import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if any required field is missing or empty
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(errorHandler(400, 'Username or email already exists'));
    }

    // Hash the password
    const hashPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // Save the new user to the database
    const result = await newUser.save();
    res.json('Signup Successful');
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

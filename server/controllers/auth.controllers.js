import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  if (
    !userName ||
    !email ||
    !password ||
    userName === '' ||
    email === '' ||
    password === ''
  ) {
    res.status(400).json({ message: 'All filled are required' });
  }

  const hashPassword = await bcryptjs.hashSync(password,10)

  const newUser = new User({
    userName,
    email,
    password: hashPassword,
  });
  try {
    const result = await newUser.save();
    res.send('Signup Successful');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

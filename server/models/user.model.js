const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: string,
      require: true,
      unique: true,
    },
    email: {
      type: string,
      require: true,
      unique: true,
    },
    email: {
      type: string,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

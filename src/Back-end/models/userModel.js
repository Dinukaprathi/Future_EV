const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Method to find a user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// Method to compare password
userSchema.methods.matchPassword = function (enteredPassword) {
  return enteredPassword === this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
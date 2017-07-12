const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  profilePhoto: String,
  about: String
});

const Client = mongoose.model('Client', userSchema);

module.exports = Client;

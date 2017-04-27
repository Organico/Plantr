var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  profilePhoto: String,
  about: String
  // gardens: Array,
  // coverPhoto: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: String,
  username: String,
  email: String,
  // gardens: Array,
  profilePhoto: String,
  // coverPhoto: String,
  about: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  email: String,
  gardens: Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;
var mongoose = require('mongoose');

var gardenSchema = new mongoose.Schema({
  gardenId: Number,
  plantId: Number,
  gardenGrid: Array,
  plantGrid: Array,
  userEmail: String,
  gardenName: String,
  profilePicture: String,
  profileEmail: String,
  profileNickname: String,
  gardenImage: String,
  hardinessZone: String
});

var Garden = mongoose.model('Garden', gardenSchema);

module.exports = Garden;


const mongoose = require('mongoose');

const gardenSchema = new mongoose.Schema({
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
  hardinessZone: String,
  likesAndDislikes: Object
});

const Garden = mongoose.model('Garden', gardenSchema);

module.exports = Garden;


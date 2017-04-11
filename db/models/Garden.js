var mongoose = require('mongoose');

var gardenSchema = new mongoose.Schema({
  gardenId: Number,
  plantId: Number,
  gardenGrid: Array,
  plantGrid: Array
});

var Garden = mongoose.model('Garden', gardenSchema);

module.exports = Garden;


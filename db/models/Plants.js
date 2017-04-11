var mongoose = require('mongoose');

var plantSchema = new mongoose.Schema({
  plantId: {type: String, unique: true},
  name: String,
  description: String,
  season: String,
  instruction: String,
  hardinessZone: String,
  price: Number,
  quantity: String,
  sunlight: String,
  germination: String,
  harvest: Number,
  rowSpacing: Number,
  extremeWarning: Array
});

var Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
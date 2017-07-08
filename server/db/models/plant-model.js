const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  plantId: String,
  image: String
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;

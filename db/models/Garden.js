var mongoose = require('mongoose');

var gardenSchema = new mongoose.Schema({
  garden: Object
});

var Garden = mongoose.model('Garden', gardenSchema);

module.exports = Garden;


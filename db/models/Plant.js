var mongoose = require('mongoose');

var plantSchema = new mongoose.Schema({
  plantId: String,
  image: String
});

var Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;

  // description: String,
  // season: String,
  // instruction: String,
  // hardinessZone: String,
  // price: Number,
  // quantity: String,
  // sunlight: String,
  // germination: String,
  // harvest: Number,
  // rowSpacing: Number,
  // extremeWarning: Array

      //   "name": "sunflower",
      // "description": "A massive beast of a flower",
      // "season": "summer" ,
      // "instructions": "Cover and keep watered until seeds sprout in 7 to 10 days. When first true leaves appear (the second set of leaves); thin plants to about 2 feet apart. Depending on the variety, sunflowers will mature and develop seeds in 80 to 120 days. Sow a new row every 2 to 3 weeks to enjoy continuous blooms until the first frost.",
      // "hardinessZone": ">5",
      // "price": 5,
      // "quantity": "1 packet",
      // "sunlight": "full-sun",
      // "germination": "10-14 days",
      // "harvest": 55,
      // "rowSpacing": 1.5, //TBD
      // "extremeWarning": [60, 90]   //insert ideal range, determine F or C
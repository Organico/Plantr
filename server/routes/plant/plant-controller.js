const express = require('express');
const router = express.Router();
const Plant = require('../../../db/models/Plant')

/*--------------------GET REQUEST---------------------------------------------*/

router.get('/', function(req, res, next) {
  Plant.find({}, (err, data) => {
    if (err) {
      console.error('There was an error getting the plant info: ', err);
      res.status(404);
    } else {
      console.log('Successful get request for plant info');
      res.status(200).send(data);
    }
  })
});

/*--------------------POST REQUEST---------------------------------------------*/

router.post('/', (req, res, next) => {
  let plant = new Plant({
    plantId: req.body.plantId,
    image: req.body.image
  });
  plant.save({}, (err, data) => {
    if (err) {
      console.error('There was an error saving the plant info onto the server: ', err);
      res.status(500);
    } else {
      console.log('Successfully posting plant info on the server');
      res.status(200).send(data);
    }
  });
});

module.exports = router;

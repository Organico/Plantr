const express = require('express');
const router = express.Router();
const User = require('../../../db/models/User');

/*--------------------GET REQUEST---------------------------------------------*/

router.get('/', function(req, res, next) {
  User.find({}, (err, data) => {
    if (err) {
      console.error('There was an error getting the user info: ', err);
      res.status(404);
    } else {
      console.log('Successful get request for user info');
      res.status(200).send(data);
    }
  })
});

router.get('/:email', function(req, res, next) {
  let userInfo;
  User.find({}, (err, data) => {
    if (err) {
      console.error('There was an error getting a specific user info: ', err);
      res.status(404);
    } else {
      data.forEach((user) => {
        if (user.email === req.params.email) {
          userInfo = user;
        }
      })
      console.log('Successful get request for specific user info');
      res.status(200).send(userInfo);
    }
  })
});

router.get('/hardiness', function(req, res, next) {
  request.get('https://phzmapi.org/' + req.query.zipCode + '.json', function(err, data) {
    if (err) {
      console.error('There was an error getting the hardiness zone on the server: ', err);
      res.status(404);
    } else {
      console.log('Successful get request for hardiness zone API');
      res.status(200).send(data.body);
    }
  })
})

/*--------------------POST REQUEST---------------------------------------------*/

router.post('/', (req, res, next) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    profilePhoto: req.body.profilePhoto,
    about: req.body.about
    // gardens: req.body.gardens, <-- possible addition
    // coverPhoto: req.body.coverPhoto, <-- possible addition
  });
  user.save({}, (err, data)=> {
    if (err) {
      console.error('There was an error saving the user info onto the server: ', err);
      res.status(500);
    } else {
      console.log('Successfully posting user info on the server');
      res.status(200).send(data);
    }
  });
});

/*--------------------PUT REQUEST-----------------------------------------*/

// updating the user About Me
router.put('/:id', (req, res, next) => {
  User.findById(req.body.id, (err, result) => {
    if (err) {
      console.error('There has been a serverside error updating the aboutMe: ', err);
      res.status(500);
    } else {
      result.about = req.body.about;
      result.save((err) => {
        if (err) {
          console.error('There has been a serverside error saving the updated aboutMe: ', err);
          res.status(500);
        } else {
          console.log('Successfully updated an AboutMe on the server');
          res.status(200).send(result);
        }
      });
    }
  });
});

module.exports = router;

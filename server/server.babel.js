var express = require('express');

const app = express();
const User = require('../db/models/User');
const Garden = require('../db/models/Garden')
const Plant = require('../db/models/Plant')
const Forum = require('../db/models/Forum')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}));

app.use('/', express.static('public'));

mongoose.connect('mongodb://test:test@ds015750.mlab.com:15750/plantrdb', function(err) {
  if(err) {
    console.log('connection error', err);
  }
  else {
    console.log('connection with database successful');
  }
});

const db = mongoose.connection;


/*--------------------GET REQUEST---------------------------------------------*/
app.get('/api/users', function(req, res, next) {
  User.find({}, (err, data) => {
    if (err) {
      console.error(err);
    }
    res.status(200).send(data);
    next();
  })
});

app.get('/api/gardens', function(req, res, next) {
  console.log("Server side: ", req);
  Garden.find({}, (err, data) => {
    if (err) {
      console.error(err);
    }
    res.status(200).send(data);
    next();
  })
});

app.get('/api/plants', function(req, res, next) {
  Plant.find({}, (err, data) => {
    if (err) {
      console.error(err);
    }
    res.status(200).send(data);
    next();
  })
});

app.get('/api/forum', function(req, res, next) {
  let email = req.query
  Forum.find({}, (err, data) => {
    if (err) {
      console.error(err);
    }
    res.status(200).send(data);
    next();
  })
});

app.get('/api/forum/:email', function(req, res, next) {
  Forum.find({}, (err, data) => {
    if (err) {
      console.error(err);
    }
    res.status(200).send(data);
    next();
  })
});

/*--------------------POST REQUEST---------------------------------------------*/

app.post('/api/users', (req, res, next) => {
  console.log("Inside api/users");
  let user = new User({
    userId: req.body.userId,
    username: req.body.username,
    email: req.body.email,
    gardens: req.body.gardens,
    profilePhoto: req.body.profilePhoto,
    coverPhoto: req.body.coverPhoto
  });
  user.save({}, (err)=> {
    if (err) {
      console.error(err);
    }
    res.send(200, 'Saved to the DB');
  });
});

app.post('/api/gardens', (req, res, next) => {
  console.log("In /api/gardens server side")
  let garden = new Garden({
    gardenId: req.body.gardenId,
    plantId: req.body.plantId,
    gardenGrid: req.body.gardenGrid,
    plantGrid: req.body.plantGrid
  });
  garden.save({}, (err)=> {
    if (err) {
      console.error(err);
    }
    res.send(200);
  });
});

app.post('/api/plants', (req, res, next) => {
  let plant = new Plant({
    plantId: req.body.plantId,
    image: req.body.image
  });
  plant.save({}, (err)=> {
    if (err) {
      console.error(err);
    }
    res.send(200);
  });
});

app.post('/api/forum', (req, res, next) => {
  let forum = new Forum({
    // category: req.body.category,
    // subjectLine: req.body.subjectLine,
    // message: req.body.message,
    // tags: req.body.tags,
    // region: req.body.region,
    // replies: req.body.replies,
    // voteCount: req.body.voteCount,
    // userId: req.body.userId,
    profile: req.body.profile,
    title: req.body.title,
    message: req.body.message,
    nickname: req.body.nickname,
    email: req.body.email,
    replies: req.body.replies
  });
  forum.save({}, (err)=> {
    if (err) {
      console.error(err);
    }
    res.send(200, 'Posted to Forum');
  });
});


/*--------------------PUT REQUEST-----------------------------------------*/
app.put('/api/forum', (req, res, next) => {
  Forum.findById(req.body.id, function(err, result) {
      if (err) {
        console.error('There has been a serverside error updating the replies: ', err)
      } else {
        result.replies.push(req.body.replies);
        result.save(function(err) {
        if (err) {
          console.error('error');
        }
        else {
          res.send(200, result);
          console.log(result);
        }
      });
    }
  });
});

app.put('/api/forum/:id', (req, res, next) => {
  Forum.findById(req.body.id, function(err, result) {
      if (err) {
        console.error('There has been a serverside error updating the posts: ', err)
      } else {
        result.message = req.body.message;
        result.title = req.body.title;
        result.save(function(err) {
        if (err) {
          console.error('error');
        }
        else {
          res.send(200, result);
          console.log('Successfully updated the post on the server');
        }
      });
    }
  });
});

/*--------------------DELETE REQUEST-----------------------------------------*/

app.delete('/api/forum/:id', function(req, res, next) {
  Forum.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      console.error('There was an error deleting your post: ', err)
    } else {
      res.send(200, 'You have successfully deleted the post');
    }
  });
});

//Deleting reply posts
app.put('/api/forum/:id/:replyId', function(req, res, next) {
  var deleteId;
  Forum.findById(req.params.id, function(err, result) {
    console.log('FOUND THE USERID ', result.replies.length)
    if (err) {
      console.error('There was an error deleting your post: ', err)
    } else {
      result.replies.forEach( (key, i) => {
        if (key['replyUser']['clientID'] === req.params.replyId) {
          deleteId = i;
        }
      });
      result.replies.splice(deleteId, 1);
      result.save(function(err) {
        if (err) {
          console.error('error deleting SERVER: ', err);
        }
        else {
          res.send(200, result);
          console.log('SUCCESSFULLY DELETED');
        }
      });
    }
  });
});


app.use(function(err, req, res, next){
  console.log('Something failed');
  res.status(500).send({"Error" : err.message})
});

app.listen(process.env.PORT || 3000);
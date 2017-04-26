const express = require('express');
const app = express();
const User = require('../db/models/User');
const Garden = require('../db/models/Garden')
const Plant = require('../db/models/Plant')
const Forum = require('../db/models/Forum')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const request = require('request');

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

app.get('/api/users/hardiness', function(req, res, next) {
  console.log('IN THE SERVER: ', req.query.zipCode)
  request.get('https://phzmapi.org/' + req.query.zipCode + '.json', function(err, data) {
    if (err) {
      console.error('error on the server API: ', err);
    } else {
      console.log('THIS WILL BE THE MIRACLE: ', res.body);
      res.status(200).send(data.body);
    }
  })

  // User.find({}, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   }
  //   res.status(200).send(data);
  //   next();
  // })
})

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
  var garden = new Garden({
    gardenId: req.body.gardenId,
    plantId: req.body.plantId,
    gardenGrid: req.body.gardenGrid,
    plantGrid: req.body.plantGrid,
    userEmail: req.body.userEmail,
    gardenName: req.body.gardenName,
    gardenImage: req.body.gardenImage
  });
  garden.save({}, (err)=> {
    if (err) {
      console.error(err);
    }
    res.send(200);
  });

    var api_key = 'key-b90d2dcc5bdd42c5abceba45568ea1dd';
    var domain = 'sandboxa7ed15c3bb5b4de696ad9041ddcadb4a.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    console.log("Here is your gardenName", garden.gardenName)

    var data = {
      from: 'Plantr <postmaster@sandboxa7ed15c3bb5b4de696ad9041ddcadb4a.mailgun.org>',
      to: 'skebaish1992@gmail.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
      html: '<html>Inline image here: <img src="https://www.sciencea-z.com/shared/images/units/plant-life.jpg"></html>'
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(error);
      if (error) {
        console.log("You had an error", error);
      } else {
        console.log("The body is ", body);
      }


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
// posting replies on the server
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
          console.log('Successfully posted a reply on the server');
        }
      });
    }
  });
});

// updating posts on the server
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

// updating replies on the server
app.put('/api/forum/:id/:replyId', function(req, res, next) {
  let modifiedId;
  Forum.findById(req.params.id, function(err, result) {
    if (err) {
      console.error('There was an error deleting your post: ', err)
    } else {
      result.replies.forEach((key, i) => {
        if (key.message === req.body.params.oldMessage) {
          modifiedId = i;
        }
      });
      let newMessage = result.replies[modifiedId];
      newMessage['message'] = req.body.params.message;
      result.replies.splice(modifiedId, 1, newMessage)
      result.save(function(err) {
        if (err) {
          console.error('There was an error updating your response from the server: ', err);
        }
        else {
          res.send(200, result);
          console.log('successfully updated response on the server');
        }
      });
    }
  });
});

/*--------------------DELETE REQUEST-----------------------------------------*/
// deleting posts made by users
app.delete('/api/forum/:id', function(req, res, next) {
  Forum.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      console.error('There was an error deleting your post: ', err)
    } else {
      res.send(200, 'You have successfully deleted the post');
    }
  });
});

// deleting replies made by users
app.delete('/api/forum/:id/:replyId', function(req, res, next) {
  let deleteId;
  Forum.findById(req.params.id, function(err, result) {
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
          console.error('There was an error deleting your post from the server: ', err);
        }
        else {
          res.send(200, result);
          console.log('successfully deleted post on the serverside');
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
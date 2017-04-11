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

// db = mongoose.connection;


/*--------------------GET REQUEST---------------------------------------------*/
app.get('/api/users', function(req, res, next) {
  User.find({}, (err, list) => {
    if (err) {
      return next(new Error(err));
    }
    res.send(list);
  })
});


axios.get('/api/users')
  .then( (response) => {
    console.log("in response", response.data)
  })

app.get('/api/gardens', function(req, res, next) {
  console.log("Server side: ", req);
  Garden.find({}, (err, list) => {
    if (err) {
      return next(new Error(err));
    }
    res.send(list);
  })
});

app.get('/api/plants', function(req, res, next) {
  Plant.find({}, (err, list) => {
    if (err) {
      return next(new Error(err));
    }
    res.send(list);
  })
});

app.get('/api/forum', function(req, res, next) {
  Forum.find({}, (err, list) => {
    if (err) {
      return next(new Error(err));
    }
    res.send(list);
  })
});

/*--------------------POST REQUEST---------------------------------------------*/

app.post('/api/users', (req, res, next) => {
  console.log("Inside api/users");
  let user = new User(req.body);
  user.save({}, (err)=> {
    if (err) {
      return next(new Error(err));
    }
    res.status(200)//.send({"_id": todo._id, "task": req.body.task});
  });
});

app.post('/api/gardens', (req, res, next) => {
  console.log("In /api/gardens server side")
  let garden = new Garden(req.body);
  console.log(req.body);
  garden.save({}, (err)=> {
    if (err) {
      console.log("Errored out");
      return next(new Error(err));
    }
    res.status(200);
  });
});

app.post('/api/plants', (req, res, next) => {
  let plant = new Plant(req.body);
  plant.save({}, (err)=> {
    if (err) {
      return next(new Error(err));
    }
    res.status(200);
  });
});

app.post('/api/forum', (req, res, next) => {
  let forum = new Forum(req.body);
  forum.save({}, (err)=> {
    if (err) {
      return next(new Error(err));
    }
    res.status(200);
  });
});

/*--------------------DELETE REQUEST-----------------------------------------*/

app.delete('/api/todos/:id', function(req, res, next) {
  // Todo.findOne({_id: req.params.id}).exec(function (err, item) {
  //   if (err || !item) {
  //     console.log('error finding record to delete', err);
  //     return next(new Error(err));
  //   }
  //   item.remove(function (err, success, next) {
  //     if (err) return next(err);
  //     console.log('deleted successfully', item);
  //     res.send('deleted successfully');
  //   });
  // });
});

app.use(function(err, req, res, next){
  console.log('Something failed');
  res.status(500).send({"Error" : err.message})
});

app.listen(process.env.PORT || 3000);
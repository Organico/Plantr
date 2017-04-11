  const mongoose = require('mongoose');


  var plantData = [
    {
      "plantId": "101",
      "color": "red"
    },
    {
      "plantId": "102",
      "color": "red"
    },
    {
      "plantId": "103",
      "color": "red"
    },
  ];

  var gardenData = [
    {
      "gardenId": "201",
      "userId": "1",
      "gardenGrid": [
        {"x": 0, "y": 0, "color": "brown", "size": 50},
        {"x": 50, "y": 50, "color": "brown", "size": 50},
        {"x": 0, "y": 50, "color": "brown", "size": 50 },
        {"x": 50, "y": 0, "color": "brown", "size": 50 }
      ],
      "plantGrid": [
        {"x": 0, "y": 0, "color": "green", "size": 50},
        {"x": 50, "y": 50, "color": "yellow", "size": 50},
        {"x": 0, "y": 50, "color": "black", "size": 50 },
        {"x": 50, "y": 0, "color": "black", "size": 50 }
      ]
    },
    {
      "gardenId": "202",
      "userId": "1",
      "gardenGrid": [
        {"x": 0, "y": 0, "color": "red", "size": 50},
        {"x": 50, "y": 50, "color": "red", "size": 50},
        {"x": 0, "y": 50, "color": "red", "size": 50 },
        {"x": 50, "y": 0, "color": "red", "size": 50 },
        {"x": 0, "y": 100, "color": "red", "size": 50 },
        {"x": 50, "y": 100, "color": "red", "size": 50 }],
      "plantGrid": [
        {"x": 0, "y": 0, "color": "blue", "size": 50},
        {"x": 50, "y": 50, "color": "white", "size": 50},
        {"x": 0, "y": 50, "color": "red", "size": 50 },
        {"x": 50, "y": 0, "color": "yellow", "size": 50 }
      ]
    }
  ]

  var forumData = [
    {
      "category": "summer crops",
      "subjectLine": "Can't grow muh taters",
      "message": "I need some help grow'n muh taters. I planted a potato seed but it aint sprout'n.",
      "tags": ["potato", "summer"],
      "region": "Mid-West",
      "replies": [{"message": "did you try adding water?", "voteCount": 1, "userId": 77}],
      "voteCount": 4,
      "userId": 3
    },
      {
      "category": "pests",
      "subjectLine": "weird bug in my tomatoes. Help!!",
      "message": "I have a weird bug in my tomatoes, it's all green and stuff. Is this dangerous??",
      "tags": ["bug", "pest"],
      "region": "North-East",
      "replies": [{"message": "does it bite?", "voteCount": 1, "userId": 77}, {"message": "try petting it", "voteCount": 0, "userId": 78}],
      "voteCount": 1,
      "userId": 4
    }
  ]

  var userData = [
    {
        "userId": "1",
        "username": "Habibi123",
        "email": "falafel@gmail.com",
        "gardens": ["201"]
    }
  ]

  var Plant = require('../db/models/Plant.js');
  var Garden =require('../db/models/Garden.js');
  var Forum = require ('../db/models/Forum.js');
  var User = require ('../db/models/User.js');

  console.log("We made it!");

  // var mongoose = require('mongoose');
  mongoose.connect('mongodb://test:test@ds015750.mlab.com:15750/plantrdb');
  var db = mongoose.connection;

  db.once('open', function(){
  console.log('Yay DB is now connected');
  }).on('error', function(){
    console.log('db connection interupted');
  });

  // console.log("Here!")

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log('Dropping and then Seeding the Database!!!!');
  });

  //Step 1: Drop old data
  Plant.collection.drop();
  Garden.collection.drop();
  Forum.collection.drop();
  // User.collection.drop();

  // Step 2: Add data from `data.json`
  console.log("This is the gardenData: ", gardenData);
  Plant.collection.insertMany(plantData);
  Garden.collection.insertMany(gardenData);
  Forum.collection.insertMany(forumData);
  // User.collection.insertMany(userData);

  console.log("end of seeding file")



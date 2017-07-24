const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
const cron = require('node-cron');
const forum = require('./routes/forum-controller');
const gardens = require('./routes/garden-controller');
const plants = require('./routes/plant-controller');
const users = require('./routes/user-controller');

// var date = new Date();

// cron.schedule('10 * * * *', function(){
//   let api_key = 'key-b90d2dcc5bdd42c5abceba45568ea1dd';
//   let domain = 'sandboxa7ed15c3bb5b4de696ad9041ddcadb4a.mailgun.org';
//   let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
//   const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?&appid=b625bae7d54136d7e2d33c6a3f383f9e&units=metric';
//   let encodedLocation = encodeURIComponent('Lafayette, CA');
//   let requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
//   let hotWeatherAlert = {
//     from: 'Plantr <postmaster@sandboxa7ed15c3bb5b4de696ad9041ddcadb4a.mailgun.org>',
//     to: 'skebaish1992@gmail.com',
//     subject: 'Warning: Your garden may be experiencing exceess heat today',
//     text: 'Heat Warning',
//     html: '<html><img src=' +"https://c1.staticflickr.com/3/2841/34191201701_1d8b5dcec9_b.jpg" + '></html>'
//   };
//   let coldWeatherAlert = {
//     from: 'Plantr <postmaster@sandboxa7ed15c3bb5b4de696ad9041ddcadb4a.mailgun.org>',
//     to: 'skebaish1992@gmail.com',
//     subject: 'Warning: Your garden may be experiencing excees cold today',
//     text: 'Cold Warning',
//     html: '<html><img src=' +"https://c1.staticflickr.com/5/4179/34164138582_a460eccfd7_b.jpg" + '></html>'
//   };
//   let temperature;
//   request.get(requestUrl, function(err, andrewChung) {
//     if (err) {
//       console.error('There was an error getting the hardiness zone on the server: ', err);
//       andrewChung.status(404);
//     } else {
//       // description = andrewChung .andrewChung .weather[0].description;
//       let weatherData = (JSON.parse(andrewChung.body))
//       let weather = weatherData.weather[0].description;
//       mailgun.messages().send(hotWeatherAlert, function (error, body) {
//         if (error) {
//           console.error("You had an error sending your emails out: ", error);
//           andrewChung.send(404);
//         } else {
//           console.log("The body is ", body);
//           andrewChung.status(200).send(body);
//         }
//       })
//     }
//   });
// })

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use('/', express.static('public'));
mongoose.connect('mongodb://test:test@ds015750.mlab.com:15750/plantrdb', function(err) {
  if (err) {
    console.error('There has been an error connection to the server: ', err);
  } else {
    console.log('connection with database successful');
  }
});

const db = mongoose.connection;

// SET OUR ROUTES
app.use('/api/forum', forum);
app.use('/api/gardens', gardens);
app.use('/api/plants', plants);
app.use('/api/users', users);

app.use((err, req, res, next) => {
  console.log('Something failed');
  res.status(500).send({"Error" : err.message})
});

app.listen(process.env.PORT || 3000);

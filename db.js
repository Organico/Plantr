const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo');

mongoose.connection.once('open', function () {
  console.log('Connected to db');
}).on('error', function () {
  console.log('Error connecting to db');
});
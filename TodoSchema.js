require('./db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: String
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;


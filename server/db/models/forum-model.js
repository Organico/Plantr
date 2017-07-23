const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  profile: String,
  title: String,
  message: String,
  nickname: String,
  email: String,
  replies: Array,
  time: String,
  category: String
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;


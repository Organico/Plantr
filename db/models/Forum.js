var mongoose = require('mongoose');

var forumSchema = new mongoose.Schema({
  category: String,
  subjectLine: String,
  message: String,
  tags: Array,
  region: String,
  replies: Array,
  voteCount: Number,
  userId: Number
});

var Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;


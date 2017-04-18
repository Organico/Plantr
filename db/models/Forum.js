var mongoose = require('mongoose');

var forumSchema = new mongoose.Schema({
  // category: String,
  // subjectLine: String,
  // message: String,
  // tags: Array,
  // region: String,
  // replies: Array,
  // voteCount: Number,
  // userId: Number
  profile: String,
  title: String,
  message: String,
  nickname: String
});

var Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;


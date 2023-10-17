const mongoose = require('mongoose');
const commentSchema = require('./Comment');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: true
    },
    postText: {
      type: String,
      required: true
    },
    comments: [commentSchema],
    postAuthor: {
      type: String,
      required: true
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

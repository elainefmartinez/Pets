const mongoose = require('mongoose');
const commentSchema = require('./Comment');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    post_title: {
      type: String,
      required: true
    },
    post_text: {
      type: String,
      required: true
    },
    comments: [commentSchema],
    post_author: {
      type: String,
      required: true
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

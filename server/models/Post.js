const mongoose = require('mongoose');
const commentSchema = require('./Comment');

const { Schema } = mongoose;

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
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
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const commentSchema = new Schema({
    comment_text: {
        type: String,
        required: true 
    },
    comment_user: {
        type: String,
        required: true
    }
});

module.exports = commentSchema;
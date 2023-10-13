const { gql } = require ("apollo-server-express"); 

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    posts_made: [Post]
  }

  type Post {
    _id: ID!
    post_text: String
    post_title: String
    post_author: String
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    comment_text: String
    comment_user: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input PostInput {
    _id: ID
    post_text: String
    post_title: String
    post_author: String
  }

  input CommentInput {
    _id: ID
    comment_text: String
    comment_user: String
  }

  type Query {
    posts: [Post]
    user: User
    post(_id: ID!, comments: [ID]): Post
    me: User
  }

  type Mutation {
    login(email:String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String! ): Auth
    addPost(post: PostInput): Post
    addComment(comment_text: String, comment_user: String): Comment
    updatePost(_id: ID!, post_text: String, post_title: String): Post
    updateComment(_id: ID!, comment_text: String): Comment
  }
`;

module.exports = typeDefs;

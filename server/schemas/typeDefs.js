const { gql } = require ("apollo-server-express"); 

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    posts_made: [Post]
  }

  type Post {
    _id: ID!
    post_text: String
    post_title: String
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
    
  }

  input CommentInput {
    
  }

  type Query {
    me:User
  }

  type Mutation {
    loginUser (email:String!, password: String!): Auth
    addUser (username: String!, email: String!, password: String! ): Auth
  }
`;

module.exports = typeDefs;

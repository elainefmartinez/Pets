const { gql } = require ("apollo-server-express"); 

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    postsMade: [Post]
  }

  type Post {
    _id: ID!
    postText: String
    postTitle: String
    postAuthor: String
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    commentText: String
    commentUser: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input PostInput {
    _id: ID
    postText: String
    postTitle: String
    postAuthor: String
  }

  input CommentInput {
    _id: ID
    commentText: String
    commentUser: String
  }

  # type Query {
  #   posts: [Post]
  #   user: User
  #   # post(_id: ID!, comments: [ID]): Post
  #   post(_id:ID!):Post
  #   me: User
  # }

  type Query {
    users: [User]
    user(username: String!): User
    postsMade(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    login(email:String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String! ): Auth
    addPost(post: PostInput): Post
    #changed this
    #addComment(comment_text: String, comment_user: String): Comment
    addComment(postId: ID!, commentText: String!): Post
    updatePost(_id: ID!, postText: String, postTitle: String): Post
    updateComment(_id: ID!, commentText: String): Comment
    #added these two lines below
    removePost(postId: ID!): Post
    removeComment(thoughtId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;

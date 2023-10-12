import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login ($email: String!, $password: String!) {
    login(email:$email, password: $password) {
        token
        user {
            _id
            username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser( $username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($post_text: String!) {
        addPost( post_text: $post_text) {
            _id
            post_text
            comments{
                _id
                comment_text

            }
        }
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($post_text: String!) {
        updatePost( post_text: $post_text) {
            _id
            post_text
            comments{
                _id
                comment_text
            }
        }
    }
`;


export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $comment_text: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      post_title
      post_text
      comments {
        _id
        comment_text
        comment_user
      }
    }
  }
`;


export const UPDATE_COMMENT = gql`
    mutation updateComment ($postId: ID!, comment_text:String!) {
        updateComment(postId: $postId, commentText: $commentText) {
            _id
            post_title
            post_text
            comments{
                _id
                comment_text
                comment_user
            }
    }
}
`;

// export const DELETE_COMMENT = gql`
//     mutation deleteComment($commentId: ID!, $commentText: String!) {
//         deleteComment(postId: $postId, commentText: $commentText) {
//             _id
//             post_text
//             comments {
//                 _id
//                 comment_text
//                 comment_user
//             }
//         }
//     }
// 

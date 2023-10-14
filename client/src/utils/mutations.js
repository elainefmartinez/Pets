import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login ($email: String!, $password: String!) {
    login(email:$email, password: $password) {
        token
        user {
            _id
            username
            email
            password
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
                email
                password
            }
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($post: PostInput) {
        addPost(post:$post) {
            _id
            comments{
                _id
                comment_text
                comment_user
            }
            post_author
            post_text
            post_title
        }
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($id: ID!, $post_text: String, $post_title: String) {
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
    mutation updateComment ($postId: ID!, $comment_text:String!) {
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


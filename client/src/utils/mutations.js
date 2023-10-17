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
                commentText
                commentUser
            }
            postAuthor
            postText
            postTitle
            
        }
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($id: ID!, $postText: String, $postTitle: String) {
        updatePost( postText: $postText) {
            _id
            postText
            comments{
                _id
                commentText
            }
        }
    }
`;


export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postTitle
      postText
      comments {
        _id
        commentText
        commentUser
      }
    }
  }
`;


export const UPDATE_COMMENT = gql`
    mutation updateComment ($postId: ID!, $commentText:String!) {
        updateComment(postId: $postId, commentText: $commentText) {
            _id
            postTitle
            postText
            comments{
                _id
                commentText
                commentUser
            }
    }
}
 `;

// export const DELETE_COMMENT = gql`
//     mutation deleteComment($commentId: ID!, $commentText: String!) {
//         deleteComment(postId: $postId, commentText: $commentText) {
//             _id
//             postText
//             comments {
//                 _id
//                 commentText
//                 commentUser
//             }
//         }
//     }


import {gql} from'@apollo/client';

export const QUERY_USER =gql`
    query user ($username: String!) {
      
        user(username: $username) {
            _id
            username
            email
            postsMade {
                _id
                postTitle
                postText
                
            }
        }
    }
`;

export const QUERY_POSTS = gql `
   query postsMade  {
  postsMade {
    _id
    comments {
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

export const QUERY_SINGLE_POST = gql`
   query getSinglePost($postId: ID!) {
  post(postId: $postId) {
    _id
    postTitle
    postText
    postAuthor
    comments {
      _id
      commentText
      commentUser
    }

  }
}
`;

export const QUERY_ME = gql`
    query me {
    me {
      email
      username
      _id
      postsMade {
        _id
        postAuthor
        postText
        postTitle
      }
    }
}
`;









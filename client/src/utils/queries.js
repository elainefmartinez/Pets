import {gql} from'@apollo/client';

export const QUERY_USER =gql`
    query user {
        user {
            _id
            username
            email
            posts_made {
                _id
                post_title
                post_text
            }
        }
    }
`;

export const QUERY_POSTS = gql `
   query posts  {
  posts {
    _id
    comments {
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

export const QUERY_SINGLE_POST = gql`
   query getSinglePost($id: ID!) {
  post(_id: $id) {
    _id
    comments {
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

export const QUERY_ME = gql`
    query me {
    me {
      email
      _id
      posts_made {
        _id
        post_author
        post_text
        post_title
      }
    }
}
`;









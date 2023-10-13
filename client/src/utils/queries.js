import {gql} from'@apollo/client';

export const QUERY_USER =gql`
    query user($username:String!) {
        user(username: $username) {
            _id
            username
            email
            # in typedefs Sam calls it posts_made
            posts_made {
                _id
                post_title
                post_text
            }
        }
    }
`;

export const QUERY_POSTS = gql `
    query getPosts {
        # in typedefs Sam calls it posts_made
        posts_made {
            _id
            post_title
            post_text
            post_author
        }
    }
`;

export const QUERY_SINGLE_POST = gql`
    query getSinglePost ($postId: ID!) {
        post(postId: $postId) {
            _id
            post_title
            post_text
            post_author
            comments {
                comment_text
                comment_user
            }
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            # in typedefs Sam calls it posts_made
            posts_made {
            _id
            post_title
            post_text
            post_author
        }
        }
    }
    `;






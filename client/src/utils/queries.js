import {gql} from'@apollo/client';

export const QUERY_USER =gql`
    query user($username:String!) {
        user(username: $username) {
            _id
            username
            email
            posts {

            }
        }
    }
`;

export const QUERY_POSTS = gql `
    query getPosts {
        posts {
            _id
            post_text
            post_title
        }
    }
`;

export const QUERY_SINGLE_POST = gql`
    query getSinglePost ($postId: ID!) {
        post(postId: $postId) {
            _id
            post_text
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
        }
    }
    `;






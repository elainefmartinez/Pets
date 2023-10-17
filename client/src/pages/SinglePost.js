import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

//might be the same but need to look at
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

//need to rename for posts
import { QUERY_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  //need to rename for posts like postId
  const { postId } = useParams();

  //need to rename for posts
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  //need to rename for posts
  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {/* //need to rename for posts */}
        {post.post_author} <br />
        {/* <span style={{ fontSize: '1rem' }}>
          made this post on {post.createdAt}
        </span> */}
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
           {/* //need to rename for posts and extension */}
          {post.post_text}
        </blockquote>
      </div>

      <div className="my-5">
         {/* //need to rename for post and comments */}
        <CommentList comments={post.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
         {/* //need to rename for posts */}
        <CommentForm postId={post._id} />
      </div>
    </div>
  );
};

export default SinglePost;

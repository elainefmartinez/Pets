import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

//might be the same but need to look at
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

//need to rename for posts
import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  //need to rename for posts like postId
  const { thoughtId } = useParams();

  //need to rename for posts
  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  //need to rename for posts
  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {/* //need to rename for posts */}
        {thought.thoughtAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
           {/* //need to rename for posts */}
          had this thought on {thought.createdAt}
        </span>
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
          {thought.thoughtText}
        </blockquote>
      </div>

      <div className="my-5">
         {/* //need to rename for post and comments */}
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
         {/* //need to rename for posts */}
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SinglePost;

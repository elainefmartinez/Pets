import React from 'react';
import { useQuery } from '@apollo/client';

//need to change this to current thing
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

//need to rename based on queries thoughts
import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
//need to rename based on queries thoughts
const { loading, data } = useQuery(QUERY_POSTS);
const posts = data?.postsMade || [];
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
            {/* need to change this into Post thing */}
          <PostForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            // Post List
            <PostList
              posts={posts}
              title="Some Love for Pet(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

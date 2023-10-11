import React from 'react';
import { useQuery } from '@apollo/client';

//need to change this to current thing
//import ThoughtList from '../components/ThoughtList';
//import ThoughtForm from '../components/ThoughtForm';

//need to rename based on queries thoughts
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
//need to rename based on queries thoughts
const { loading, data } = useQuery(QUERY_THOUGHTS);
const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
            {/* need to change this into Post thing */}
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            // Post List
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

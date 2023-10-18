import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({
    posts,
    title,
    showTitle = true,
    showUsername = true,
  }) => {
    if (posts?.length === 0 ) {
      return <h3>No Posts Yet</h3>;
    }
  
    return (
      <div>
        {showTitle && <h3>{title}</h3>}
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="card mb-3">
              <h4 className="card-header bg-success text-light p-2 m-0">
                {showUsername ? (
                  <Link
                    className="text-light"
                    to={`/profiles/${post.postAuthor}`}
                  >
                    {post.postAuthor} <br />
                    <span style={{ fontSize: '1rem' }}>
                      Made this Post:<br />
                    </span>
                    <span style={{ fontSize: '1rem' }}>
                      {post.postTitle}
                    </span>
                  </Link>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem' }}>
                     {post.postTitle}
                    </span>
                  </>
                )}
              </h4>
              <div className="card-body bg-light p-2">
                <p>{post.postText}</p>
              </div>
              <Link
                className="btn btn-success btn-block btn-squared"
                to={`/posts/${post._id}`}
              >
                Join this discussion CLICK to comment.
              </Link>
            </div>
          ))}
      </div>
    );
  };
  
  export default PostList;
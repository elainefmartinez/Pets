import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
    const [post_text, setPostText] = useState('');
    const [post_title, setPostTitle] = useState('');

    const [characterCount, setCharacterCount] = useState(0);
  
    const [addPost, { error }] = useMutation(ADD_POST, {
      update(cache, { data: { addPost } }) {
        try {
          const { posts } = cache.readQuery({ query: QUERY_POSTS });
  
          cache.writeQuery({
            query: QUERY_POSTS,
            data: { posts: [addPost, ...posts] },
          });
        } catch (e) {
          console.error(e);
        }
  
        // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, posts: [...me.posts, addPost] } },
        });
      },
    });
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addPost({
          variables: {
            post_title,
            post_text,
            post_author: Auth.getProfile().data.username,
          },
        });
        setPostTitle('');
        setPostText('');
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      if (name === 'post_text' && value.length <= 280) {
        setPostText(value);
        setCharacterCount(value.length);
      }
      //may need to check this if handlechange can't run twice in same form submit
      if (name === 'post_title' && value.length <= 280) {
        setPostTitle(value);
        setCharacterCount(value.length);
      }
    };
  
    return (
      <div>
        <h3>What's your opinion</h3>
  
        {Auth.loggedIn() ? (
          <>
            <p
              className={`m-0 ${
                characterCount === 280 || error ? 'text-danger' : ''
              }`}
            >
              Character Count: {characterCount}/280
            </p>
            <form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
               <div className="col-12 col-lg-9">
                <textarea
                  name="post_title"
                  placeholder="Post Title"
                  value={post_title}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-12 col-lg-9">
                <textarea
                  name="post_text"
                  placeholder="Post Text"
                  value={post_text}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></textarea>
              </div>
  
              <div className="col-12 col-lg-3">
                <button className="btn btn-primary btn-block py-3" type="submit">
                  Add Post
                </button>
              </div>
              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
          </>
        ) : (
          <p>
            You need to be logged in to share your posts. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    );
  };
  
  export default PostForm;
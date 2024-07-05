import React, { useState } from 'react';
import { createPost } from '../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content, userId: user.uid, username: user.displayName });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='d-flex flex-column w-75 m-auto'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className='mb-3 w-50 align-self-center text-center p-1'
          style={{ height: 50 }}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the content here..."
          className='mb-3 p-1'
          style={{ height: 200 }}
          required
        />
        <button type="submit" className='btn btn-success border p-2 w-25 align-self-center'>Create Post</button>
      </div>
    </form>
  );
};

export default CreatePost;


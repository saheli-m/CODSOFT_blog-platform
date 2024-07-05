import React, { useState, useEffect } from 'react';
import { updatePost, getPost } from '../firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getPost(id);
      const postData = postDoc.data();
      if (user && user.uid !== postData.userId) {
        navigate('/');
      } else {
        setTitle(postData.title);
        setContent(postData.content);
      }
    };

    fetchPost();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, content });
      navigate(`/post/${id}`);
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
          className='mb-3 p-1 w-50 align-self-center text-center'
          style={{ height: 50 }}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className='mb-3 p-1'
          style={{ height: 200 }}
          required
        />
        <button type="submit" className='btn btn-primary border p-2 w-25 align-self-center'>
          Update Post
        </button>
      </div>
    </form>
  );
};

export default EditPost;



import React, { useEffect, useState } from 'react';
import { getPost, deletePost } from '../firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getPost(id);
      setPost(postDoc.data());
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this post?`)) {
      try {
        await deletePost(id);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='d-flex flex-column p-3 justify-content-evenly col-10 m-auto'>
      <div className='cont p-2 rounded'>
        <h2 className='pb-2'>{post.title}</h2>
        <p className='pb-2'>{post.content}</p>
        <p>Created by <b>{post.username}</b></p>
      </div>
      {user && user.uid === post.userId && (
        <div className='d-flex justify-content-between mt-3'>
          <button onClick={() => navigate(`/edit/${id}`)} className='btn btn-outline-success fw-medium me-2'>
            Edit Post
          </button>
          <button onClick={handleDelete} className='btn btn-outline-danger fw-medium'>
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPost;



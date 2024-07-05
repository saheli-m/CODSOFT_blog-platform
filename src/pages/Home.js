import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../firebase/firestore';
import PostList from '../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsSnapshot = await getAllPosts();
      const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <div className='front p-3'>
      <h1>Blog Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;


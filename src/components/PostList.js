import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = ({ posts }) => {
  return (
    <div className='blogs ps-3'>
      {posts.map(post => (
        <div key={post.id} className='list p-2'>
          <Link className='link-dark link-offset-1 link-underline-opacity-0' to={`/post/${post.id}`}>
            <p className='pt-2'>{post.title} - <i>{post.username}</i></p> 
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;


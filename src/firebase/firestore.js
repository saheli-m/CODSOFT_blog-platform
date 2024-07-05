import { db } from './config';
import { collection, addDoc, updateDoc, deleteDoc, getDoc, getDocs, doc } from 'firebase/firestore';

const postsCollection = collection(db, 'posts');

export const createPost = (post) => {
  return addDoc(postsCollection, post);
};

export const updatePost = (id, updatedPost) => {
  const postDoc = doc(db, 'posts', id);
  return updateDoc(postDoc, updatedPost);
};

export const deletePost = (id) => {
  const postDoc = doc(db, 'posts', id);
  return deleteDoc(postDoc);
};

export const getPost = (id) => {
  const postDoc = doc(db, 'posts', id);
  return getDoc(postDoc);
};

export const getAllPosts = () => {
  return getDocs(postsCollection);
};

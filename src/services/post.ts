import * as PostDataAccess from '../data-accesses/post';
import { Post } from '../entities/post';

export const getGroupPosts = async (id) => {
  return await PostDataAccess.getGroupPosts(id);
};

export const getUserPosts = async (id) => {
  return await PostDataAccess.getUserPosts(id);
};

export const getPost = async (id) => {
  const post : Post = await PostDataAccess.getPostByRelations(id, ['replies']);
  return post;
};

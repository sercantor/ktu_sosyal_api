import { Post } from '../entities/post';

export const getPostByRelations = async (id, relations) => { return await Post.findOne(id, { relations }); };

export const getGroupPosts = async (groupId) => Post.find({ where: { group: groupId }, order: { created: 'DESC' } });

export const getUserPosts = async (userId) => Post.find({ where: { user: userId }, order: { created: 'DESC' } });

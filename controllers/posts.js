import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Post from '../models/Post.js';

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const {
    body,
    user: { _id }
  } = req;
  const newPost = await Post.create({ ...body, author: _id });
  res.status(201).json(newPost);
});

export const getSinglePost = asyncHandler(async (req, res) => {
  const {
    params: { id }
  } = req;
  const post = await Post.findById(id).populate('author');
  if (!post) throw new ErrorResponse(`Post with id of ${id} not found`, 404);
  res.json(post);
});

export const updatePost = asyncHandler(async (req, res) => {
  const {
    params: { id },
    body: { title, body, author }
  } = req;
  const updatedPost = await Post.findOneAndUpdate({ _id: id }, { title, body, author }, { new: true });
  if (!updatedPost) throw new ErrorResponse(`Post with id of ${id} not found, could not update`, 404);
  res.json(updatedPost);
});

export const deletePost = asyncHandler(async (req, res) => {
  const {
    params: { id }
  } = req;
  const deleted = await Post.findOneAndDelete({ _id: id });
  if (!deleted) throw new ErrorResponse(`Post with id of ${id} not found, could not delete`, 404);
  res.json({ success: `Post with id of ${id} was deleted` });
});

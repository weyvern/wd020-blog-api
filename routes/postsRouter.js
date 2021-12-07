import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/posts.js';
import verifyToken from '../middlewares/verifyToken.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(verifyToken, createPost);

postsRouter.route('/:id').get(getSinglePost).put(updatePost).delete(deletePost);

export default postsRouter;

import { Router } from 'express';
import { getMe, signIn, signUp } from '../controllers/users.js';
import verifyToken from '../middlewares/verifyToken.js';

const usersRouter = Router();

usersRouter.post('/signup', signUp);
usersRouter.post('/signin', signIn);
usersRouter.get('/me', verifyToken, getMe);

export default usersRouter;

import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import imageUploader from '../middlewares/imageUploader.js';
import { uploadResponse } from '../controllers/uploads.js';

const uploadsRouter = Router();

uploadsRouter.post('/', verifyToken, imageUploader.single('image'), uploadResponse);

export default uploadsRouter;

import 'dotenv/config.js';
import './db/mongoose.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import usersRouter from './routes/usersRouter.js';
import postsRouter from './routes/postsRouter.js';
import uploadsRouter from './routes/uploadsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, 'public/uploads');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(publicDir));
app.use(express.json());
app.use('/auth', usersRouter);
app.use('/posts', postsRouter);
app.use('/uploads', uploadsRouter);
app.use('*', (req, res) => res.send('Blog API'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

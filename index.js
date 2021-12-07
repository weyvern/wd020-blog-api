import 'dotenv/config.js';
import './db/mongoose.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import postsRouter from './routes/postsRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import verifyToken from './middlewares/verifyToken.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/login', (req, res) => {
  // logic login
  const token = jwt.sign({ name: 'Jorge' }, process.env.JWT_SECRET);
  res.send(token);
});

app.get('/profile', verifyToken, (req, res) => {
  const {
    user: { name }
  } = req;
  res.send(`Welcome ${name}`);
});

app.use('/posts', postsRouter);
app.use('*', (req, res) => res.send('Blog API'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

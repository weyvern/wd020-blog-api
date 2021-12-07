import 'dotenv/config.js';
import './db/mongoose.js';
import express from 'express';
import session from 'express-session';
import postsRouter from './routes/postsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5000;

const sessionsOps = {
  secret: '12345',
  cookie: {},
  resave: false,
  saveUninitialized: false
};

app.use(session(sessionsOps));
app.use(express.json());

app.get('/login', (req, res) => {
  console.log(req.session);
  // login logic
  req.session.auth = 'you are logged in';
  res.send(req.session.auth);
});

app.get('/profile', (req, res) => {
  console.log(req.session);
  req.session.auth ? res.send('You are authenticated') : res.send('Please log in');
});

app.get('/hacker', (req, res) => {
  console.log(req.session);
  res.send('<a href="http://localhost:5000/banktransfer/1234">YOU WON $1,000,000</a>');
});

app.get('/banktransfer/:id', (req, res) => {
  req.session.auth ? res.send(`You transferred money to ${req.params.id}`) : res.send('Please log in');
});

app.use('/posts', postsRouter);
app.use('*', (req, res) => res.send('Blog API'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

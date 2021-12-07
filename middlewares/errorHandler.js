const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  if (err.message === 'jwt malformed') {
    err.message = 'Invalid login';
  }
  res.status(err.statusCode || 500).json({ error: err.message });
};

export default errorHandler;

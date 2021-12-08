const validateJOI = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

export default validateJOI;

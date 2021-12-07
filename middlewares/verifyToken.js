import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const {
    headers: { authorization }
  } = req;
  jwt.verify(authorization, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};

export default verifyToken;

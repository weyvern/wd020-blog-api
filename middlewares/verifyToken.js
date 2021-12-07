import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization }
    } = req;
    if (!authorization) throw new ErrorResponse('Please log in', 401);
    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    if (!user) throw new ErrorResponse('User does not exist', 404);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;

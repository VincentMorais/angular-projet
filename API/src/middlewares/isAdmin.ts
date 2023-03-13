import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users.models';
import DecodeToken from '../utils/decodeToken';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: 'NO TOKEN',
    });
  }

  try {
    const token = header.split(' ')[1];
    const user: User = DecodeToken(token);

    if (user.role === 'admin') {
      return next();
    }

    return res.status(401).json({
      message: 'You are not authorized to access this resource',
    });
  } catch (error) {
    return res.status(401).json({
      message: 'You are not authorized to access this resource',
    });
  }
};

export default isAdmin;

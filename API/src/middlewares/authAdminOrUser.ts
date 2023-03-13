import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users.models';
import DecodeToken from '../utils/decodeToken';

const authAdminOrUser = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const { id } = req.params;

  if (!header) {
    return res.status(401).json({
      message: 'You are not authorized to access this resource',
    });
  }

  try {
    const token: string = header.split(' ')[1];
    const user: User = DecodeToken(token);
    const userId: number = <number>user.id;
    const idNumber: number = Number(id);

    if (user.role === 'admin' || idNumber === userId) {
      return next();
    }
    throw new Error('You are not authorized to access this resource');
  } catch (error) {
    return res.status(401).json({
      message: 'You are not authorized to access this resource',
    });
  }
};

export default authAdminOrUser;

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users.models';
import DecodeToken from '../utils/decodeToken';

const authUserThisUserOnly = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({
        message: 'NO TOKEN',
      });
    }
    const token: string = header.split(' ')[1];
    const user: User = DecodeToken(token);
    const userId: number = <number>user.id;
    const idNumber: number = Number(id);

    if (idNumber !== userId) {
      return res.status(401).json({
        message: 'You are not authorized to access this resource',
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'You are not authorized to access this resource',
    });
  }

  return next();
};

export default authUserThisUserOnly;

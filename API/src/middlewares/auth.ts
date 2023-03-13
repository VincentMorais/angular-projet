import { Request, Response, NextFunction } from 'express';
import VerifyToken from '../utils/verifyToken';

const CheckToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: 'You are not authorized to access this resource',
    });
  }

  try {
    const token: string = header.split(' ')[1];
    VerifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};

export default CheckToken;

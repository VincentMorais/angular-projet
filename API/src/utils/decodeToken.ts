import jwt, { UserJwtPayload } from 'jsonwebtoken';
import { User } from '../models/users.models';

require('dotenv').config();

const DecodeToken = (token: string): User => {
  try {
    const user = jwt.verify(token, process.env.PRIVATE_KEY as string) as UserJwtPayload;
    return user.user;
  } catch (error) {
    throw new Error('Impossible to decod the token');
  }
};

export default DecodeToken;

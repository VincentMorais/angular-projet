import jwt from 'jsonwebtoken';

require('dotenv').config();

const { env } = process;

const verifyToken = (token: string): boolean => {
  const jwtSecret: string = env.PRIVATE_KEY as string;
  try {
    jwt.verify(token, jwtSecret);
    return true;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default verifyToken;

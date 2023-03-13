import jwt from 'jsonwebtoken';
import { User } from '../models/users.models';

require('dotenv').config();

const { env } = process;

const GenerateToken = async (user: User) => {
  const jwtSecret: jwt.Secret = env.PRIVATE_KEY as string;
  const token = await jwt.sign({ user }, jwtSecret, { expiresIn: '1h' });

  return token;
};

export default GenerateToken;

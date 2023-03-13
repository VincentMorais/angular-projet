import jwt from 'jsonwebtoken';
import { User } from '../models/users.models';

declare module 'jsonwebtoken' {
  export interface UserJwtPayload extends jwt.JwtPayload {
    user: User,
    iat: number,
    exp: number,
  }
}

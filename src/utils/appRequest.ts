import { Request } from 'express';

export default interface AppRequest extends Request {
  decodedToken?: {
    userId: string;
    userRole: 'user' | 'admin';
    iat?: number;
    exp?: number;
  };
}

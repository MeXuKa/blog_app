import { Request } from 'express';
import JwtPayload from './JwtPayload.js';

export default interface AppRequest extends Request {
  decodedToken?: JwtPayload;
}

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import AppRequest from '../types/AppRequest.js';
import Config from '../config/config.js';
import logger from '../utils/logger.js';

const SECRET_SIGN = Config.getConfig().SECRET_SIGN;

if (!SECRET_SIGN) {
    logger.error('SECRET_SIGN is not defined.');
    process.exit(1);
}

const verifyToken = (req: AppRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) throw new AppError('Authorization token is missing.', 401);
        
        const decoded = jwt.verify(token, SECRET_SIGN);
        req.decodedToken = decoded as AppRequest['decodedToken'];

        next();
    } catch (err) {
        next(err);
    }
}

export default verifyToken;
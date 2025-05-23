import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import Config from '../config/config.js';

const SECRET_SIGN = Config.getConfig().SECRET_SIGN;

if (!SECRET_SIGN) {
    logger.error('SECRET_SIGN is not defined.');
    process.exit(1);
}

export const generateToken = (userId: string, userRole: 'user' | 'admin'): string => {
    return jwt.sign({ userId, userRole }, SECRET_SIGN, { expiresIn: '1h' });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            const err = new Error('Authorization token is missing.');
            (err as any).status = 401;
            throw err;
        }
        
        const decoded = jwt.verify(token, SECRET_SIGN);
        (req as any).decodedToken = decoded;

        next();
    } catch (err) {
        next(err);
    }
}
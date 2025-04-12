import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import Config from '../config/config.js';

const SECRET_SIGN = Config.getConfig().SECRET_SIGN;

if (!SECRET_SIGN) {
    logger.error('SECRET_SIGN is not defined');
    process.exit(1);
}

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, SECRET_SIGN, { expiresIn: '1h' });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) return;
        
        const decoded = jwt.verify(token, SECRET_SIGN);
        (res as any).decodedToken = decoded;

        next();
    } catch (err) {
        next(err);
    }
}
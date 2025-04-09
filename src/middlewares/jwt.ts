import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import logger from '../logger.js';

dotenv.config();

const SECRET_SIGN = process.env.SECRET_SIGN;

if (!SECRET_SIGN) {
    logger.error('Brak podpisu uwierzytelniającego');
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
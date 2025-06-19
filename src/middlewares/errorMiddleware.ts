import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    logger.error(err.message || 'Unexpected error.');
    const status: number = err.status || 500;
    const message: string = err.message || 'Unexpected error.';

    if ('remainingPoints' in err) {
        res.status(429).json({ error: 'Too many requests.' });
        return;
    }
    
    res.status(status).json({ error: message });
}

export default globalErrorHandler;
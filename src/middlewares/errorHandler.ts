import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

export const userErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (!err.route || !err.route.includes('/users')) return next(err);

    logger.error(`${err.message}`);
    const status = err.status || 500;

    if (status === 400) {
        res.status(400).json({ error: 'Missing input data' });
        return;
    } 
    if (status === 401) {
        res.status(401).json({ error: 'Invalid input data' });
        return;
    }

    if (status === 404) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    
    if (status === 500) {
        res.status(500).json({ error: 'Błąd serwera, ponów prośbę później' });
        return;
    }

    next(err);
}

export const postErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (!err.route || !err.route.includes('/posts')) return next(err);

    logger.error(`${err.message}`);
    const status = err.status || 500;

    if (status === 400) {
        res.status(400).json({ error: 'Missing input data' });
        return;
    } 
    if (status === 404) {
        res.status(404).json({ error: 'Post not found' });
        return;
    }
    
    if (status === 500) {
        res.status(500).json({ error: 'Server error, please try again later' });
        return;
    }

    next(err);
}

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.message}`);
    const status = err.status || 500;

    res.status(status).json({ error: 'Unexpected error' });
}
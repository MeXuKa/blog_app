import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    logger.error(`${err.message}`);
    const status = err.status || 500;

    if (err.route) {
        if (err.route.includes('/api/users')) {
            if (status === 400) {
                res.status(400).json({ error: 'Missing input data.' });
                return;
            } 
            if (status === 401) {
                res.status(401).json({ error: 'Invalid input data.' });
                return;
            }
        
            if (status === 404) {
                res.status(404).json({ error: 'User not found.' });
                return;
            }
            
            if (status === 500) {
                res.status(500).json({ error: 'Server error, please try again later.' });
                return;
            }
        } else if (err.route.includes('/api/posts')) {
            if (status === 400) {
                res.status(400).json({ error: 'Missing input data.' });
                return;
            } 
            if (status === 404) {
                res.status(404).json({ error: 'Post not found.' });
                return;
            }
            
            if (status === 500) {
                res.status(500).json({ error: 'Server error, please try again later.' });
                return;
            }
        }
    }
    
    res.status(status).json({ error: 'Unexpected error.' });
}

export default globalErrorHandler;
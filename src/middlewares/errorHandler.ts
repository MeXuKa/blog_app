import { Request, Response, NextFunction } from 'express';
import logger from '../logger.js';

export const userErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (!err.route || !err.route.includes('/users')) return next(err);

    logger.error(`${err.message}`);
    const status = err.status || 500;

    if (status === 400) {
        res.status(400).json({ error: 'Błędne dane wejściowe' });
        return;
    } 
    if (status === 404) {
        res.status(404).json({ error: 'Użytkownik nie znaleziony' });
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
        res.status(400).json({ error: 'Błędne dane wejściowe' });
        return;
    } 
    if (status === 404) {
        res.status(404).json({ error: 'Post nie znaleziony' });
        return;
    }
    
    if (status === 500) {
        res.status(500).json({ error: 'Błąd serwera, ponów prośbę później' });
        return;
    }

    next(err);
}

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.message}`);
    const status = err.status || 500;

    res.status(status).json({ error: 'Nieoczekiwany błąd' });
}
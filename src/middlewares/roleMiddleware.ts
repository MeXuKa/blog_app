import { Request, Response, NextFunction } from "express";

export const authorizeRole = (role: 'user' | 'admin') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { decodedToken } = req as any;
        
            if (!decodedToken) {
                const err = new Error('Authorization failed. Token missing.');
                (err as any).status = 401;
                throw err;
            }
        
            if (decodedToken.userRole !== role) {
                const err = new Error('Access denied.');
                (err as any).status = 403;
                throw err;
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}
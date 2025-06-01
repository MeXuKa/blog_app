import { Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import AppRequest from "../utils/appRequest.js";

export const authorizeRole = (role: 'user' | 'admin') => {
    return async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
        try{
            if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);
            if (req.decodedToken.userRole !== role) throw new AppError('Access denied.', 403);

            next();
        } catch (err) {
            next(err);
        }
    }
}
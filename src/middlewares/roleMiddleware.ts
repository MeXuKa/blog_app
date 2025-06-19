import { Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import AppRequest from "../types/AppRequest.js";
import RoleType from "../types/RoleType.js";

export const authorizeRole = (role: RoleType) => {
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
import { Request, Response, NextFunction } from 'express';
import { getUsersDb, getUserDb, createUserDb, checkUserDb, updateUserDb, deleteUserDb } from '../services/userService.js';
import logger from '../utils/logger.js'; 
import { generateToken } from '../middlewares/jwtHandler.js';

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        const users = await getUsersDb();
        
        logger.info(`Successfully returned users`);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        const user = await getUserDb(decodedToken.userId);

        logger.info(`Successfully returned user with id ${decodedToken.userId}`);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = await createUserDb(username, email, password);
    
        if (!user) return;  

        const token: string = generateToken(user.id);

        logger.info(`Successfully created user`);
        res.status(201).json({user, token});
    } catch (err) {
        next(err);
    }
}

export const checkUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await checkUserDb(email, password);
        
        if (!user) return;
        
        const token: string = generateToken(user.id);

        logger.info(`Successfully logged in the user`);
        res.status(200).json({user, token});
    } catch (err) {
        next(err);
    }
}

export const updateUserController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        const data = req.body;
        const user = await updateUserDb(decodedToken.userId, data);

        logger.info(`Successfully updated user with id ${decodedToken.userId}`);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        await deleteUserDb(decodedToken.userId);

        logger.info(`Successfully deleted user with id ${decodedToken.userId}`);
        res.status(200).json({ message: `User with id ${decodedToken.userId} has been deleted` });
    } catch (err) {
        next(err);
    }
}
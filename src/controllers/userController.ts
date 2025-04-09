import { Request, Response, NextFunction } from 'express';
import { getUsersDb, getUserDb, createUserDb, checkUserDb, updateUserDb, deleteUserDb } from '../db/userDb.js';
import logger from '../logger.js'; 
import { generateToken } from '../middlewares/jwt.js';

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        const users = await getUsersDb();
        
        logger.info(`Udało się zwrócić użytkowników`);
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

        logger.info(`Udało się zwrócić użytkownika o id ${decodedToken.userId}`);
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

        logger.info(`Udało się stworzyć użytkownika`);
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

        logger.info(`Udało się zalogować użytkownika`);
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

        logger.info(`Udało się zaktualizować użytkownika o id ${decodedToken.userId}`);
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

        logger.info(`Udało się usunąć użytkownika o id ${decodedToken.userId}`);
        res.status(200).json({ message: `Użytkownik o id ${decodedToken.userId} został usunięty` });
    } catch (err) {
        next(err);
    }
}
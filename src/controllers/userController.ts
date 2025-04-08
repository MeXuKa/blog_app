import { Request, Response, NextFunction } from 'express';
import { getUsersDb, getUserDb, createUserDb, updateUserDb, deleteUserDb } from '../db/userDb.js';
import logger from '../logger.js'; 

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsersDb();
        
        logger.info(`Udało się zwrócić użytkowników`);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

export const getUserController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await getUserDb(id);

        logger.info(`Udało się zwrócić użytkownika o id ${id}`);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const createUserController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = await createUserDb(username, email, password);

        logger.info(`Udało się stworzyć użytkownika`);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export const updateUserController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await updateUserDb(id, data);

        logger.info(`Udało się zaktualizować użytkownika o id ${id}`);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const deleteUserController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await deleteUserDb(id);

        logger.info(`Udało się usunąć użytkownika o id ${id}`);
        res.status(200).json({ message: `Użytkownik o id ${id} został usunięty` });
    } catch (err) {
        next(err);
    }
}
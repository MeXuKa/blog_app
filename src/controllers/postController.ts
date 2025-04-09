import { Request, Response, NextFunction } from 'express';
import { getPostsDb, getPostDb, createPostDb, updatePostDb, deletePostDb } from '../db/postDb.js';
import logger from '../logger.js'; 

export const getPostsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const posts = await getPostsDb(id);
    
        logger.info(`Udało się zwrócić posty`);
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

export const getPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        const post = await getPostDb(decodedToken.userId);

        logger.info(`Udało się zwrócić posta o id ${decodedToken.userId}`);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

export const createPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        const { title, body } = req.body;
        const post = await createPostDb(title, body, decodedToken.userId);

        logger.info(`Udało się stworzyć posta`);
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
}

export const updatePostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        const data = req.body;
        const post = await updatePostDb(decodedToken.userId, data);

        logger.info(`Udało się zaktualizować posta o id ${decodedToken.userId}`);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

export const deletePostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) return;

        await deletePostDb(decodedToken.userId);

        logger.info(`Udało się usunąć posta o id ${decodedToken.userId}`);
        res.status(200).json({ message: `Post o id ${decodedToken.userId} został usunięty` });
    } catch (err) {
        next(err);
    }
}
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

export const getPostController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const post = await getPostDb(id);

        logger.info(`Udało się zwrócić posta o id ${id}`);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

export const createPostController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, body, userId } = req.body;
        const post = await createPostDb(title, body, userId);

        logger.info(`Udało się stworzyć posta`);
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
}

export const updatePostController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const post = await updatePostDb(id, data);

        logger.info(`Udało się zaktualizować posta o id ${id}`);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

export const deletePostController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await deletePostDb(id);

        logger.info(`Udało się usunąć posta o id ${id}`);
        res.status(200).json({ message: `Post o id ${id} został usunięty` });
    } catch (err) {
        next(err);
    }
}
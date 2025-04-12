import { Request, Response, NextFunction } from 'express';
import { getPostsDb, getPostDb, createPostDb, updatePostDb, deletePostDb } from '../services/postService.js';
import logger from '../utils/logger.js'; 

export const getPostsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const posts = await getPostsDb(id);
    
        logger.info(`Successfully returned posts`);
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

        logger.info(`Successfully returned post with id ${decodedToken.userId}`);
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

        logger.info(`Successfully created post`);
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

        logger.info(`Successfully updated post with id ${decodedToken.userId}`);
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

        logger.info(`Successfully deleted post with id ${decodedToken.userId}`);
        res.status(200).json({ message: `Post with id ${decodedToken.userId} has been deleted` });
    } catch (err) {
        next(err);
    }
}
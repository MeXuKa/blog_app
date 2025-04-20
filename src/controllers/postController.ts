import { Request, Response, NextFunction } from 'express';
import { getPostsDb, getPostDb, createPostDb, updatePostDb, deletePostDb } from '../services/postService.js';
import logger from '../utils/logger.js'; 

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
export const getPostsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        const id = req.params.id;
        const posts = await getPostsDb(id);
    
        if (!posts) {
            const err = new Error('No posts found.');
            (err as any).status = 404;
            throw err;
        }

        logger.info(`Successfully returned posts`);
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

// @desc    Get post
// @route   GET /api/posts/:id
// @access  Private
export const getPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        const post = await getPostDb(decodedToken.userId);

        if (!post) {
            const err = new Error('User not found.');
            (err as any).status = 404;
            throw err;
        }

        logger.info(`Successfully returned post with id ${decodedToken.userId}`);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

// @desc    Create post
// @route   POST /api/posts/register
// @access  Private
export const createPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        const { title, body } = req.body;
        const post = await createPostDb(title, body, decodedToken.userId);

        if (!post) {
            const err = new Error('User registration failed.');
            (err as any).status = 500;
            throw err;
        }

        logger.info(`Successfully created post`);
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
}

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        const data = req.body;
        const post = await updatePostDb(decodedToken.userId, data);

        if (!post) {
            const err = new Error('User update failed.');
            (err as any).status = 500;
            throw err;
        }

        logger.info(`Successfully updated post with id ${decodedToken.userId}`);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        await deletePostDb(decodedToken.userId);

        logger.info(`Successfully deleted post with id ${decodedToken.userId}`);
        res.status(200).json({ message: `Post with id ${decodedToken.userId} has been deleted` });
    } catch (err) {
        next(err);
    }
}
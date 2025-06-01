import { Response, NextFunction } from 'express';
import { getPostsDb, getPostDb, createPostDb, updatePostDb, deletePostDb } from '../services/postService.js';
import logger from '../utils/logger.js'; 
import AppError from '../utils/appError.js';
import AppRequest from '../utils/appRequest.js';

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
export const getPostsController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const { id } = req.params;

        if (!id || typeof id !== 'string') throw new AppError('Missing or invalid post ID.', 400);

        const posts = await getPostsDb(id);
    
        if (!posts) throw new AppError('No posts found.', 404);

        logger.info(`Successfully returned posts`);
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

// @desc    Get post
// @route   GET /api/posts/:id
// @access  Private
export const getPostController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const { id } = req.params;

        if (!id || typeof id !== 'string') throw new AppError('Missing or invalid post ID.', 400);

        const post = await getPostDb(id);

        if (!post) throw new AppError('Post not found.', 404);

        logger.info(`Successfully returned post with id ${id}`);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

// @desc    Create post
// @route   POST /api/posts
// @access  Private
export const createPostController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const { title, body } = req.body;

        if (!title || !body || typeof title !== 'string' || typeof body !== 'string') throw new AppError('Title and body are required.', 400);

        const post = await createPostDb(title, body, req.decodedToken.userId);

        if (!post) throw new AppError('Post creation failed.', 500);

        logger.info(`Successfully created post`);
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
}

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePostController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const { data } = req.body;
        
        if (!data.title || !data.body || typeof data.title !== 'string' || typeof data.body !== 'string') 
            throw new AppError('Request body is required.', 400);

        const { id } = req.params;

        if (!id || typeof id !== 'string') throw new AppError('Missing or invalid post ID.', 400);

        const post = await updatePostDb(id, data);

        if (!post) throw new AppError('Post update failed.', 500);

        logger.info(`Successfully updated post with id ${id}`);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePostController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const { id } = req.params;

        if (!id || typeof id !== 'string') throw new AppError('Missing or invalid post ID.', 400);

        await deletePostDb(id);

        logger.info(`Successfully deleted post with id ${id}`);
        res.status(200).json({ message: `Post with id ${id} has been deleted` });
    } catch (err) {
        next(err);
    }
}
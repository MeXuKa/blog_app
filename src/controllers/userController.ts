import { Request, Response, NextFunction } from 'express';
import { getUsersDb, getUserDb, createUserDb, checkUserDb, updateUserDb, deleteUserDb } from '../services/userService.js';
import logger from '../utils/logger.js'; 
import { generateToken } from '../middlewares/jwtMiddleware.js';

// @desc    Get users
// @route   GET /api/users
// @access  Private
export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        const users = await getUsersDb();

        if (!users || users.length === 0) {
            const err = new Error('No users found.');
            (err as any).status = 404;
            throw err;
        }
        
        logger.info(`Successfully returned users`);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private
export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        const user = await getUserDb(decodedToken.userId);

        if (!user) {
            const err = new Error('User not found.');
            (err as any).status = 404;
            throw err;
        }

        logger.info(`Successfully returned user with id ${decodedToken.userId}`);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = await createUserDb(username, email, password);
    
        if (!user) {
            const err = new Error('User registration failed.');
            (err as any).status = 500;
            throw err;
        }

        const token: string = generateToken(user.id);

        logger.info(`Successfully created user`);
        res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
}

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
export const checkUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await checkUserDb(email, password);
        
        if (!user) {
            const err = new Error('Invalid email or password.');
            (err as any).status = 401;
            throw err;
        }
        
        const token: string = generateToken(user.id);

        logger.info(`Successfully logged in the user`);
        res.status(200).json({ user, token });
    } catch (err) {
        next(err);
    }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        const data = req.body;
        const user = await updateUserDb(decodedToken.userId, data);

        if (!user) {
            const err = new Error('User update failed.');
            (err as any).status = 500;
            throw err;
        }

        logger.info(`Successfully updated user with id ${decodedToken.userId}`);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;

        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }

        await deleteUserDb(decodedToken.userId);

        logger.info(`Successfully deleted user with id ${decodedToken.userId}`);
        res.status(200).json({ message: `User with id ${decodedToken.userId} has been deleted` });
    } catch (err) {
        next(err);
    }
}
import { Response, NextFunction } from 'express';
import { getUsersDb, getUserDb, createUserDb, checkUserDb, updateUserDb, deleteUserDb } from '../services/userService.js';
import logger from '../utils/logger.js'; 
import { generateToken } from '../middlewares/jwtMiddleware.js';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError.js';
import AppRequest from '../utils/appRequest.js';

// @desc    Get users
// @route   GET /api/users
// @access  Private
export const getUsersController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const users = await getUsersDb();

        if (!users || users.length === 0) throw new AppError('No users found.', 404);
        
        logger.info(`Successfully returned users`);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private
export const getUserController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const user = await getUserDb(req.decodedToken.userId);

        if (!user) throw new AppError('User not found.', 404);

        logger.info(`Successfully returned user with id ${req.decodedToken.userId}`);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
export const createUserController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password || typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') 
            throw new AppError('Username, email and password are required.', 400);

        const hashedPassword: string = await bcrypt.hash(password, 10);
        
        const user = await createUserDb(username, email, hashedPassword);
    
        if (!user) throw new AppError('User registration failed.', 500);

        const token: string = generateToken(user.id, user.role);

        logger.info(`Successfully created user`);
        res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
}

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
export const checkUserController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') 
            throw new AppError('Email and password are required.', 400);

        const user = await checkUserDb(email, password);

        if (!user) throw new AppError('Invalid email or password.', 401);
        
        const token: string = generateToken(user.id, user.role);

        logger.info(`Successfully logged in the user`);
        res.status(200).json({ user, token });
    } catch (err) {
        next(err);
    }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUserController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const { data } = req.body;

        if (!data.username || !data.password || !data.email  || typeof data.username !== 'string' || typeof data.password !== 'string' || typeof data.email !== 'string') 
            throw new AppError('Request body is required.', 400);

        const user = await updateUserDb(req.decodedToken.userId, data);

        if (!user) throw new AppError('User update failed.', 500);

        logger.info(`Successfully updated user with id ${req.decodedToken.userId}`);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUserController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        await deleteUserDb(req.decodedToken.userId);

        logger.info(`Successfully deleted user with id ${req.decodedToken.userId}`);
        res.status(200).json({ message: `User with id ${req.decodedToken.userId} has been deleted` });
    } catch (err) {
        next(err);
    }
}
import { Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import AppError from "../utils/appError.js";
import AppRequest from "../types/AppRequest.js";
import fs from 'fs';
import path from 'path';

// @desc    Upload file
// @route   POST /api/files/upload
// @access  Private
export const uploadFileController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);
        if (!req.file) throw new AppError('No file provided in request.', 400);

        logger.info('File uploaded successfully.');
        res.status(201).json({ message: "File uploaded successfully."});
    } catch (err) {
        next(err);
    }      
}

// @desc    Download file
// @route   GET /api/files/download/:filename
// @access  Private
export const downloadFileController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);

        const { filename } = req.params;
        
        if (!filename) throw new AppError('Filename parameter is missing.', 400);

        const safeFilename: string = path.basename(filename);
        const filePath: string = path.join(__dirname, '..', 'uploads', safeFilename);
        
        res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
        const readStream: fs.ReadStream = fs.createReadStream(filePath, { highWaterMark: 64 * 1024 });

        readStream.on('error', () => {
            logger.error('Error reading the file');
            next(new AppError('Error reading the file.', 500));
        });

        readStream.on('end', () => {
            logger.info('File downloaded successfully.');
        });
        
        readStream.pipe(res);
    } catch (err) {
        next(err);
    }
}
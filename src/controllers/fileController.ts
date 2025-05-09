import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import fs from 'fs';
import path from 'path';

export const uploadFileController = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            const err = new Error('No file provided in request.');
            (err as any).status = 400;
            throw err;
        }

        logger.info('File uploaded successfully.');
        res.status(201).json({ message: "File uploaded successfully."});
    } catch (err) {
        next(err);
    }      
}

export const downloadFileController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filename } = req.params;
        
        if (!filename) {
            const err = new Error('Filename parameter is missing.');
            (err as any).status = 400;
            throw err;
        }

        const safeFilename = path.basename(filename);
        const filePath = path.join(__dirname, '..', 'uploads', safeFilename);
        
        const readStream = fs.createReadStream(filePath, {
            highWaterMark: 64 * 1024,
        });

        readStream.on('error', () => {
            logger.error('Error reading the file');
            return res.status(500).json({ error: 'Error reading the file.' });
        });

        readStream.on('end', () => {
            logger.info('File downloaded successfully.');
        });
        
        res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
        readStream.pipe(res);
    } catch (err) {
        next(err);
    }
}
import * as Sentry from '@sentry/node';
import express from 'express';
import connectDB from './config/connectDB.js'; 
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { userErrorHandler, postErrorHandler, globalErrorHandler } from './middlewares/errorHandler.js';
import logger from './utils/logger.js';

if (cluster.isPrimary) {
    const numCpus = os.cpus().length;

    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Worker with id ${worker.process.pid} exited with code ${code} and signal ${signal}`);
        cluster.fork();
    });
} else {
    dotenv.config();
    Sentry.init({ dsn: process.env.SENTRY_DSN });
    const app = express();
    connectDB();
    
    const PORT = process.env.PORT;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../dist')));
    
    app.use('/users', userRoutes);
    app.use('/posts', postRoutes);
    
    Sentry.setupExpressErrorHandler(app);
    app.use(userErrorHandler);
    app.use(postErrorHandler);
    app.use(globalErrorHandler);
    
    app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
}
import * as Sentry from '@sentry/node';
import Config from './config/config.js';
import express from 'express';
import Database from './config/database.js'; 
import logger from './utils/logger.js';
import cluster from 'cluster';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { userErrorHandler, postErrorHandler, globalErrorHandler } from './middlewares/errorHandler.js';

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
    Sentry.init({ dsn: Config.getConfig().SENTRY_DSN });
    const app = express();
    Database.connectDB();
    
    const PORT = Config.getConfig().PORT;
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
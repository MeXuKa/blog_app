import * as Sentry from '@sentry/node';
import Config from './config/config.js';
import helmet from 'helmet';
import rateLimitMiddleware from './middlewares/rateLimitMiddleware.js';
import express from 'express';
import Database from './config/database.js'; 
import logger from './utils/logger.js';
import cluster from 'cluster';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import globalErrorHandler from './middlewares/errorMiddleware.js';

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
    
    const PORT = Config.getConfig().PORT || 5000;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    app.use(helmet());
    app.use(rateLimitMiddleware);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../dist')));
    
    app.use('/api/users', userRoutes);
    app.use('/api/posts', postRoutes);
    
    Sentry.setupExpressErrorHandler(app);
    app.use(globalErrorHandler);
    
    app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
}
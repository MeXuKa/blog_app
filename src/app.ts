import * as Sentry from '@sentry/node';
import Config from './config/config.js';
import helmet from 'helmet';
import rateLimitMiddleware from './middlewares/rateLimitMiddleware.js';
import cors from 'cors';
import express from 'express';
import promBundle from 'express-prom-bundle';
import Database from './config/database.js'; 
import logger from './utils/logger.js';
import cluster from 'cluster';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import globalErrorHandler from './middlewares/errorMiddleware.js';

if (cluster.isPrimary) {
    for (let i = 0; i < 1; i++) {
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
    
    const metricsMiddleware = promBundle({ includeMethod: true, includePath: true });
    const allowedOrigins = ['http://localhost:5000'];

    const corsOptions: cors.CorsOptions = {
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowed by CORS.'));
            }
        }
    };

    app.use(metricsMiddleware);
    app.use(cors(corsOptions));
    
    app.use(helmet());
    app.use(rateLimitMiddleware);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../dist')));
    
    app.use('/api/users', userRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/weather', weatherRoutes);
    
    Sentry.setupExpressErrorHandler(app);
    app.use(globalErrorHandler);
    
    app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
}
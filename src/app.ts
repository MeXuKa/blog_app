import * as Sentry from '@sentry/node';
import express, { Application } from 'express';
import Database from './config/database.js'; 
import Config from './config/config.js';
import helmet from 'helmet';
import rateLimitMiddleware from './middlewares/rateLimitMiddleware.js';
import cors from 'cors';
import corsOptions from './utils/corsOptions.js';
import promBundle from 'express-prom-bundle';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import globalErrorHandler from './middlewares/errorMiddleware.js';

Sentry.init({ dsn: Config.getConfig().SENTRY_DSN });
const app: Application = express();
Database.connectDB();

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const metricsMiddleware: promBundle.Middleware = promBundle({ includeMethod: true, includePath: true });

app.use(metricsMiddleware);
app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimitMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/weather', weatherRoutes);

Sentry.setupExpressErrorHandler(app);
app.use(globalErrorHandler);

export default app;
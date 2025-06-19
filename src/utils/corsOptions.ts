import cors from 'cors';
import AppError from './appError.js';

const allowedOrigins: string[] = ['http://localhost:5000'];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) return callback(null, true);
        else return callback(new AppError('Not allowed by CORS.', 403));
    }
};

export default corsOptions;
import cors from 'cors';

const allowedOrigins: string[] = ['http://localhost:5000'];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) return callback(null, true);
        else return callback(null, false);
    }
};

export default corsOptions;
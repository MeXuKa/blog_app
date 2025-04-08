import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../logger.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info(`Udało się połączyć z bazą danych`);
    } catch (err) {
        logger.error(`Nie udało się połączyć z bazą danych`);
    }
}

export default dbConnect;
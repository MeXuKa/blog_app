import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info(`Successfully connected to the database`);
    } catch (err) {
        logger.error(`Failed to connect to the database`);
    }
}

export default connectDB;
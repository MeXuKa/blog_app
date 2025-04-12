import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import Config from './config.js';

class Database {
    private static instance: Database;
    private isConnected = false;

    private constructor() {}

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public async connectDB() {
        if (this.isConnected) {
            logger.info('Already connected to the database');
            return;
        }

        const MONGODB_URI = Config.getConfig().MONGODB_URI;

        if (!MONGODB_URI) {
            logger.error('MONGODB_URI is not defined');
            process.exit(1);
        }

        try {
            await mongoose.connect(MONGODB_URI);
            this.isConnected = true;
            logger.info(`Successfully connected to the database`);
        } catch (err) {
            logger.error(`Failed to connect to the database`);
        }
    }
}

export default Database.getInstance();
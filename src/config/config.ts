import dotenv from 'dotenv';

dotenv.config();

interface ConfigInterface {
    PORT: string | undefined;
    MONGODB_URI: string | undefined;
    SECRET_SIGN: string | undefined;
    SENTRY_DSN: string | undefined;
    OPENWEATHER_API_KEY: string | undefined;
}

class Config {
    private static instance: Config;
    private config: ConfigInterface;

    constructor() {   
        this.config = {
            PORT: process.env.PORT,
            MONGODB_URI: process.env.MONGODB_URI,
            SECRET_SIGN: process.env.SECRET_SIGN,
            SENTRY_DSN: process.env.SENTRY_DSN,
            OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY
        }
    }

    public static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }

        return Config.instance;
    }

    public getConfig(): ConfigInterface {
        return this.config;
    }
}

export default Config.getInstance();
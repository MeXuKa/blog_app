import logger from '../utils/logger.js';
import Config from '../config/config.js';
import { Request, Response, NextFunction } from 'express';

const OPENWEATHER_API_KEY = Config.getConfig().OPENWEATHER_API_KEY;

if (!OPENWEATHER_API_KEY) {
    logger.error('OPENWEATHER_API_KEY is not defined.');
    process.exit(1);
}

export const getWeatherController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req as any;
    
        if (!decodedToken) {
            const err = new Error('Authorization failed. Token missing.');
            (err as any).status = 401;
            throw err;
        }
        
        const city: string = (req as any).query.city || 'London';
    
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${OPENWEATHER_API_KEY}`);

        if (!response.ok) {
            const err = new Error('Error while fetching weather data.');
            (err as any).status = response.status;
            throw err;
        }

        const data = await response.json();

        res.json({
            location: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            icon: data.weather[0].icon,
          });
    } catch (err) {
        next(err);
    }
}
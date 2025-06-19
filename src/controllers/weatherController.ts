import { Response, NextFunction } from 'express';
import Config from '../config/config.js';
import logger from '../utils/logger.js';
import AppError from '../utils/appError.js';
import AppRequest from '../types/AppRequest.js';
import WeatherType from '../types/WeatherType.js';

const OPENWEATHER_API_KEY = Config.getConfig().OPENWEATHER_API_KEY;

if (!OPENWEATHER_API_KEY) {
    logger.error('OPENWEATHER_API_KEY is not defined.');
    process.exit(1);
}

// @desc    Get weather data
// @route   GET /api/weather
// @access  Private
export const getWeatherController = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.decodedToken) throw new AppError('Authorization failed. Token missing.', 401);
        
        const city: string = (req.query.city as string) || 'London';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${OPENWEATHER_API_KEY}`);

        if (!response.ok) throw new AppError('Error while fetching weather data.', response.status);

        const data: WeatherType = await response.json();

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
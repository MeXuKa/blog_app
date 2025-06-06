import winston from 'winston';

const logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/app.log' })
    ]
});

export default logger;
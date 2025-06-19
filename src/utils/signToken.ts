import Config from '../config/config.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import JwtPayload from '../types/JwtPayload.js';

const SECRET_SIGN = Config.getConfig().SECRET_SIGN;

if (!SECRET_SIGN) {
    logger.error('SECRET_SIGN is not defined.');
    process.exit(1);
}

const generateToken = ({ userId, userRole }: JwtPayload): string => {
    return jwt.sign({ userId, userRole }, SECRET_SIGN, { expiresIn: '1h' });
}

export default generateToken;
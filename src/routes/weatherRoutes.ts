import { Router } from 'express';
import { getWeatherController } from '../controllers/weatherController.js';
import verifyToken from '../middlewares/jwtMiddleware.js';

const router: Router = Router();

router.get('/', verifyToken, getWeatherController);

export default router;
import { Router } from 'express';
import { getUsersController, getUserController, createUserController, checkUserController, updateUserController, deleteUserController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/jwtMiddleware.js';

const router = Router();

router.post('/register', createUserController);

router.post('/login', checkUserController);

router.get('/', verifyToken, getUsersController);

router.route('/:id').get(verifyToken, getUserController).put(verifyToken, updateUserController).delete(verifyToken, deleteUserController);

export default router;
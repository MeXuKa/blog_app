import { Router } from 'express';
import { getUsersController, getUserController, createUserController, checkUserController, updateUserController, deleteUserController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/jwtMiddleware.js';
import { authorizeRole } from '../middlewares/roleMiddleware.js';

const router: Router = Router();

router.post('/register', createUserController);

router.post('/login', checkUserController);

router.get('/', verifyToken, getUsersController);

router.route('/:id').get(verifyToken, getUserController).put(verifyToken, updateUserController).delete(verifyToken, authorizeRole('admin'), deleteUserController);

export default router;
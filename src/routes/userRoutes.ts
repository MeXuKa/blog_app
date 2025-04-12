import { Router } from 'express';
import { getUsersController, getUserController, createUserController, checkUserController, updateUserController, deleteUserController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/jwtHandler.js';

const router = Router();

router.get('', verifyToken, getUsersController);

router.get('/:id', verifyToken, getUserController);

router.post('/register', createUserController);

router.post('/login', checkUserController);

router.put('/:id', verifyToken, updateUserController);

router.delete('/:id', verifyToken, deleteUserController);

export default router;
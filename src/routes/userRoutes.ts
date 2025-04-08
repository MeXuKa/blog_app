import { Router } from 'express';
import { getUsersController, getUserController, createUserController, updateUserController, deleteUserController } from '../controllers/userController.js';

const router = Router();

router.get('', getUsersController);

router.get('/:id', getUserController);

router.post('', createUserController);

router.put('/:id', updateUserController);

router.delete('/:id', deleteUserController);

export default router;
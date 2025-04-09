import { Router } from 'express';
import { getPostsController, getPostController, createPostController, updatePostController, deletePostController } from '../controllers/postController.js'; 
import { verifyToken } from '../middlewares/jwt.js';

const router = Router();

router.get('', verifyToken, getPostsController );

router.get('/:id', verifyToken, getPostController );

router.post('', verifyToken, createPostController);

router.put('/:id', verifyToken, updatePostController);

router.delete('/:id', verifyToken, deletePostController);

export default router;
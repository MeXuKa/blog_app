import { Router } from 'express';
import { getPostsController, getPostController, createPostController, updatePostController, deletePostController } from '../controllers/postController.js'; 
import { verifyToken } from '../middlewares/jwtMiddleware.js';

const router: Router = Router();

router.route('/').get(verifyToken, getPostsController).post(verifyToken, createPostController);

router.route('/:id').get(verifyToken, getPostController).put(verifyToken, updatePostController).delete(verifyToken, deletePostController);

export default router;
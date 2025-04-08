import { Router } from 'express';
import { getPostsController, getPostController, createPostController, updatePostController, deletePostController } from '../controllers/postController.js'; 

const router = Router();

router.get('', getPostsController );

router.get('/:id', getPostController );

router.post('', createPostController);

router.put('/:id', updatePostController);

router.delete('/:id', deletePostController);

export default router;
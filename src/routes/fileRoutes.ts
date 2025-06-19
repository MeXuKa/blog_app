import { Router } from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { uploadFileController, downloadFileController } from '../controllers/fileController.js';
import verifyToken from '../middlewares/jwtMiddleware.js';

const router: Router = Router();

router.post('/upload', upload.single('file'), verifyToken, uploadFileController);

router.get('/download/:filename', verifyToken, downloadFileController);

export default router;
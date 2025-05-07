import { Router } from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { uploadFileController, downloadFileController } from '../controllers/fileController.js';

const router = Router();

router.post('/upload', upload.single('file'), uploadFileController);
router.get('download/:filename', downloadFileController);

export default router;
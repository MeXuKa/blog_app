import multer from 'multer';
import path from 'path';

const storage: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, callback) => {
        const uniqueName: string = Date.now() + '-' + file.originalname;
        callback(null, uniqueName);
    },
});

export const upload: multer.Multer = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
});
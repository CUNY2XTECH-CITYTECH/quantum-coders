import express from 'express';
import { uploadProfileImage, upload } from '../controllers/userController';

const router = express.Router();

// ✅ Profile Image Upload Route
router.post('/profiles/:id/upload', upload.single('profileImage'), uploadProfileImage);

export default router;

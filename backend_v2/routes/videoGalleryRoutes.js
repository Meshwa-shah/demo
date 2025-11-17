import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createVideoGallery, getAllVideoGallery, getVideoGallery, updateVideoGallery, deleteVideoGallery } from '../controllers/VideoGalleryController.js';
const router = express.Router();
router.post('/add', upload.single('image'), createVideoGallery);
router.get('/fetch', getAllVideoGallery);
router.get('/:id', getVideoGallery);
router.put('/edit/:id', upload.single('image'), updateVideoGallery);
router.post('/delete', deleteVideoGallery); // expects { id } in body
export default router;

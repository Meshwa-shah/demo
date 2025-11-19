import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createGallery, getAllGallery, getGallery, updateGallery, deleteGallery } from '../controllers/GalleryController.js';

const router = express.Router();

router.post('/add', upload.single('image'), createGallery);
router.get('/fetch', getAllGallery);
router.get('/:id', getGallery);
router.put('/edit/:id', upload.single('image'), updateGallery);
router.post('/delete', deleteGallery); 

export default router;

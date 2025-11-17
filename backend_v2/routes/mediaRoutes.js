import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createMedia, getAllMedia, getMedia, updateMedia, deleteMedia } from '../controllers/MediaController.js';
const router = express.Router();
router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), createMedia);
router.get('/fetch', getAllMedia);
router.get('/:id', getMedia);
router.put('/edit/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateMedia);
router.post('/delete', deleteMedia); // expects { id } in body
export default router;

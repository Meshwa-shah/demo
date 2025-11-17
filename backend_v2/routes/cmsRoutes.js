import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createCms, getAllCms, getCms, updateCms, deleteCms } from '../controllers/CmsController.js';
const router = express.Router();
router.post('/add', upload.single('image'), createCms);
router.get('/fetch', getAllCms);
router.get('/fetch/:id', getCms);
router.put('/edit/:id', upload.single('image'), updateCms);
router.post('/delete', deleteCms); // expects { id } in body
export default router;

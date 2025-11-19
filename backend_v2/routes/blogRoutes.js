import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createBlog, getAllBlog, getBlog, updateBlog, deleteBlog } from '../controllers/BlogController.js';

const router = express.Router();

router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), createBlog);
router.get('/fetch', getAllBlog);
router.get('/fetch/:id', getBlog);
router.put('/edit/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateBlog);
router.post('/delete', deleteBlog); 

export default router;

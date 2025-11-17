import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } from '../controllers/CategoryController.js';
const router = express.Router();
router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), createCategory);
router.get('/fetch', getAllCategory);
router.get('/fetch/:id', getCategory);
router.put('/edit/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), updateCategory);
router.post('/delete', deleteCategory); // expects { id } in body
export default router;

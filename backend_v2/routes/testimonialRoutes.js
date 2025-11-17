import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createTestimonial, getAllTestimonial, getTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/TestimonialController.js';
const router = express.Router();
router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), createTestimonial);
router.get('/fetch', getAllTestimonial);
router.get('/:id', getTestimonial);
router.put('/edit/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateTestimonial);
router.post('/delete', deleteTestimonial); // expects { id } in body
export default router;

import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createInquiry, getAllInquiry, getInquiry, updateInquiry, deleteInquiry } from '../controllers/InquiryController.js';
const router = express.Router();
router.post('/add', upload.single('image'), createInquiry);
router.get('/fetch', getAllInquiry);
router.get('/:id', getInquiry);
router.put('/edit/:id', upload.single('image'), updateInquiry);
router.post('/delete', deleteInquiry); // expects { id } in body
export default router;

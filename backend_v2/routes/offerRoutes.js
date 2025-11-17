import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createOffer, getAllOffer, getOffer, updateOffer, deleteOffer } from '../controllers/OfferController.js';
const router = express.Router();
router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), createOffer);
router.get('/fetch', getAllOffer);
router.get('/:id', getOffer);
router.put('/edit/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateOffer);
router.post('/delete', deleteOffer); // expects { id } in body
export default router;

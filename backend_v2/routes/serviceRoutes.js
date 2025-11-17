import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createService, getAllService, getService, updateService, deleteService } from '../controllers/ServiceController.js';
const router = express.Router();
router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), createService);
router.get('/fetch', getAllService);
router.get('/:id', getService);
router.put('/edit/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateService);
router.post('/delete', deleteService); // expects { id } in body
export default router;

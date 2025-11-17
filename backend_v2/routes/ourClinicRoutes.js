import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createOurClinic, getAllOurClinic, getOurClinic, updateOurClinic, deleteOurClinic } from '../controllers/OurClinicController.js';
const router = express.Router();
router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), createOurClinic);
router.get('/fetch', getAllOurClinic);
router.get('/edit/:id', getOurClinic);
router.put('/edit/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateOurClinic);
router.post('/delete', deleteOurClinic); // expects { id } in body
export default router;

import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createAppointment, getAllAppointment, getAppointment, updateAppointment, deleteAppointment } from '../controllers/AppointmentController.js';

const router = express.Router();

router.post('/add', upload.single('image'), createAppointment);
router.get('/fetch', getAllAppointment);
router.get('/fetch', getAppointment);
router.put('/edit/:id', upload.single('image'), updateAppointment);
router.post('/delete', deleteAppointment);
 
export default router;

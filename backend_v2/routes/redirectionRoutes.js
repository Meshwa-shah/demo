import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createRedirection, getAllRedirection, getRedirection, updateRedirection, deleteRedirection } from '../controllers/RedirectionController.js';
const router = express.Router();
router.post('/add', upload.single('image'), createRedirection);
router.get('/fetch', getAllRedirection);
router.get('/:id', getRedirection);
router.put('/edit/:id', upload.single('image'), updateRedirection);
router.post('/delete', deleteRedirection); // expects { id } in body
export default router;

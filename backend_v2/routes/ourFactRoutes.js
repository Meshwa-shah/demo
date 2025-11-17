import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createOurFact, getAllOurFact, getOurFact, updateOurFact, deleteOurFact } from '../controllers/OurFactController.js';
const router = express.Router();
router.post('/add', upload.single('image'), createOurFact);
router.get('/fetch', getAllOurFact);
router.get('/:id', getOurFact);
router.put('/edit/:id', upload.single('image'), updateOurFact);
router.post('/delete', deleteOurFact); // expects { id } in body
export default router;

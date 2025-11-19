import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createCity, getAllCity, getCity, updateCity, deleteCity } from '../controllers/CityController.js';

const router = express.Router();

router.post('/add', upload.single('image'), createCity);
router.get('/fetch', getAllCity);
router.get('/fetch/:id', getCity);
router.put('/edit/:id', upload.single('image'), updateCity);
router.post('/delete', deleteCity); // expects { id } in body

export default router;

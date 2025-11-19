import express from 'express';
import upload from '../middleware/uploadDisk.js';
import { createComment, getAllComment, getComment, updateComment, deleteComment } from '../controllers/CommentController.js';

const router = express.Router();

router.post('/add', upload.single('image'), createComment);
router.get('/fetch', getAllComment);
router.get('/fetch/:id', getComment);
router.put('/edit/:id', upload.single('image'), updateComment);
router.post('/delete', deleteComment); // expects { id } in body

export default router;

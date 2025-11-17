import express from 'express';
import { checkuser } from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', checkuser);

export default router;
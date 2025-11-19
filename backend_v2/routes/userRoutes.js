import express from 'express';
import { checkuser, adduser } from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', checkuser);
router.post('/signin', adduser);

export default router;
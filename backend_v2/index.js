import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import mainRouter from './routes/index.js'

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// connect DB
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/panel';
mongoose.connect(MONGO).then(()=> console.log('MongoDB connected')).catch(e=> console.log(e));

// mount single router at root
app.use('/', mainRouter);

const PORT = 8081;
app.listen(PORT, ()=> console.log('Server running on', PORT));

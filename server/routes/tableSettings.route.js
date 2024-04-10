import express from 'express';
import { spaceData } from '../controllers/tableSettings.controller.js';

const router = express.Router();

router.get('/spacedata', spaceData);

export default router;
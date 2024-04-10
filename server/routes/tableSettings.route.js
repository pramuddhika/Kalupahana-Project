import express from 'express';
import { getSpaceData, updateSpaceData } from '../controllers/tableSettings.controller.js';

const router = express.Router();

router.get('/getspacedata', getSpaceData);
router.put('/updatespaces', updateSpaceData)


export default router;
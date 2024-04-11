import express from 'express';
import { getSpaceData, updateSpaceData } from '../controllers/tableSettings.controller.js';

const router = express.Router();

//get space detils
router.get('/getspacedata', getSpaceData);
//update space details
router.put('/updatespaces', updateSpaceData)


export default router;
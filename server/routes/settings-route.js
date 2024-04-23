import express from 'express';
import { getSpaceData, updateSpaceData,
        addHoliday } from '../controllers/settings-controller.js';

const router = express.Router();

//get space detils
router.get('/getspace', getSpaceData);
//update space details
router.put('/updatespaces', updateSpaceData);
//add holidays
router.post('/addholidays', addHoliday);


export default router;
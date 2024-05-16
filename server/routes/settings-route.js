import express from 'express';
import { getSettingsTableDataController,updateSpaceDataController,
        addHoliday } from '../controllers/settings-controller.js';

const router = express.Router();

//get settings data
router.get('/getsettings', getSettingsTableDataController);
//update space details
router.put('/updatespaces', updateSpaceDataController);
//add holidays
router.post('/addholidays', addHoliday);


export default router;
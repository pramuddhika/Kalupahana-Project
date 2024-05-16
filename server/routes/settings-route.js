import express from 'express';
import { getSettingsTableDataController,updateSpaceDataController,updateNextDayTimeController,
        addHoliday } from '../controllers/settings-controller.js';

const router = express.Router();

//get settings data
router.get('/getsettings', getSettingsTableDataController);
//update space details
router.put('/updatespaces', updateSpaceDataController);
//update next day booking list notification time
router.put('/updatenextdaytime' , updateNextDayTimeController )
//add holidays
router.post('/addholidays', addHoliday);


export default router;
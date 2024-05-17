import express from 'express';
import { getSettingsTableDataController,
        updateSpaceDataController,
        updateNextDayTimeController,
        recordCheckController,
        AddSpecialistAreaController,
        addHolidayController,
        getSpecialistAreaController,
        deleteSpecialistAreaController } from '../controllers/settings-controller.js';

const router = express.Router();

//get settings data
router.get('/getsettings', getSettingsTableDataController);
//update space details
router.put('/updatespaces', updateSpaceDataController);
//update next day booking list notification time
router.put('/updatenextdaytime' , updateNextDayTimeController )
//update record check time
router.put('/recordcheck' , recordCheckController )
//add holidays
router.post('/addholidays', addHolidayController);
//add mechanic specifialist area
router.post('/Addspecialistarea', AddSpecialistAreaController);
//get mechanic specialistarea list
router.get('/getlist', getSpecialistAreaController)
//delete mechanic specialist ares
router.delete('/deletearea/:deleteArea', deleteSpecialistAreaController);


export default router;
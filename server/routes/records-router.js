import express from 'express';
import {getRecordsDataController,
        checkVehicleController
       } from '../controllers/records-controller.js';

const router = express.Router();

//get all data according to vehicle
router.get('/getData/:recordNumber', getRecordsDataController);
//check vehicle Number
router.get('/checkVehicle/:searchNumber', checkVehicleController);

export default router;
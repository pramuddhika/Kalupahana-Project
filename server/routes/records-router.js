import express from 'express';
import {getRecordsDataController} from '../controllers/records-controller.js';

const router = express.Router();

//get all data according to vehicle
router.get('/getData/:recordNumber', getRecordsDataController);

export default router;
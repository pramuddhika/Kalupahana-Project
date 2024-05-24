import express from 'express';
import {checkVehicleController} from '../controllers/openJob-controller.js';

const router = express.Router();

//serach vechicle is new or not
router.post('/checkVehicle', checkVehicleController);

export default router;
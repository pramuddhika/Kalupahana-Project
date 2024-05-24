import express from 'express';
import {checkBookingController} from '../controllers/openJob-controller.js';


const router = express.Router();

//check vehicle is in booking table or not
router.put('/checkbooking', checkBookingController);


export default router;
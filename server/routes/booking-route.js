import express from 'express';
import { addBooking, 
         bookingInfo,
         cancelBooking,
         cancelChecking } from '../controllers/booking-controller.js';
import {nextDates} from '../controllers/date-controller.js';

const router = express.Router();

//make resevation
router.post('/add', addBooking);
//get booking information from db
router.get('/showbooking' , bookingInfo);
//check vehicke to cancel
router.get('/checking/:vehicleNumber', cancelChecking);
//cancel booking
router.delete('/cancel', cancelBooking);
//send next-4 days
router.get('/next-dates', nextDates);


export default router;
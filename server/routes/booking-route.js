import express from 'express';
import { addBooking, 
         bookingInfo,
         cancelBooking,
         cancelChecking,
         todayBookingInfo,
         changeDate } from '../controllers/booking-controller.js';
import {nextDates} from '../controllers/date-controller.js';

const router = express.Router();

//make resevation
router.post('/add', addBooking);
//get booking information from db
router.get('/showbooking' , bookingInfo);
//get today list
router.get('/today', todayBookingInfo);
//check vehicke to cancel
router.get('/checking/:vehicleNumber', cancelChecking);
//cancel booking
router.put('/cancel', cancelBooking);
//send next-4 days
router.get('/nextdates', nextDates);
//change booking date
router.put('/changedate', changeDate);


export default router;
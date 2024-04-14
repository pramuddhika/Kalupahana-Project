import express from 'express';
import { addBooking, 
         bookingInfo,
         cancelBooking,
         cancelChecking } from '../controllers/booking-controller.js';

const router = express.Router();

//make resevation
router.post('/add', addBooking);
//get booking information from db
router.get('/showbooking' , bookingInfo);
//check vehicke to cancel
router.get('/checking', cancelChecking);
//cancel booking
router.delete('/cancel', cancelBooking);


export default router;
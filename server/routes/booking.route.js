import express from 'express';
import { addBooking, 
         bookingInfo } from '../controllers/booking.controller.js';

const router = express.Router();

//bookinga date
router.post('/add', addBooking);
//get booking information from db
router.get('/showbooking' , bookingInfo);



export default router;
import express from 'express';
import { addBooking, 
         bookingInfo,
         cancelBooking, 
         todayList} from '../controllers/booking-controller.js';

const router = express.Router();

//bookinga date
router.post('/add', addBooking);
//get booking information from db
router.get('/showbooking' , bookingInfo);
//cancel booking
router.delete('/cancel', cancelBooking);
//get today list from db
router.get('/today' , todayList);

export default router;
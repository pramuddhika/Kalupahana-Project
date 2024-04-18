import express from 'express';
import { bookingNumber } from '../controllers/dashBoard-controller.js';

const router = express.Router();

//count booking number
router.get('/numbook', bookingNumber )

export default router;
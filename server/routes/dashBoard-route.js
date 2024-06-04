import express from 'express';
import { bookingNumber,
         getJobNumberController,
         getFreeBloksController
 } from '../controllers/dashBoard-controller.js';

const router = express.Router();

//count booking number
router.get('/numbook', bookingNumber )
//count ongoing job number
router.get('/jobNumber', getJobNumberController);
//count free blocks
router.get('/freeBlocks', getFreeBloksController);

export default router;
import express from 'express';
import {checkBookingController,
        checkRegisteredVehicleController,
        checkCustomerController} from '../controllers/openJob-controller.js';


const router = express.Router();

//check vehicle is in booking table or not
router.put('/checkbooking', checkBookingController);
//ckeck vehicle is registered or not
router.get('/checkRegisteredVehicle/:jobOpenNumber' , checkRegisteredVehicleController);
//get customer data
router.get('/getCustomer/:NICnumber', checkCustomerController);


export default router;
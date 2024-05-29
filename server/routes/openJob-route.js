import express from 'express';
import {checkBookingController,
        checkRegisteredVehicleController,
        checkCustomerController,
        customerDataUpdateController,
        customerRegisterController,
        vehicleRegisterController,
        ownerChangeController,
        generatePreRepairDocumentIdController,
        generateJobIdController,
        addRecordDataController} from '../controllers/openJob-controller.js';


const router = express.Router();

//check vehicle is in booking table or not
router.put('/checkbooking', checkBookingController);
//ckeck vehicle is registered or not
router.get('/checkRegisteredVehicle/:jobOpenNumber' , checkRegisteredVehicleController);
//get customer data
router.get('/getCustomer/:NICnumber', checkCustomerController);
//update customer data
router.put('/updateCustomer', customerDataUpdateController);
//register customer
router.post('/registerCustomer', customerRegisterController);
//register vehicle
router.post('/registerVehicle', vehicleRegisterController);
//change vehicle owner  data
router.put('/ownerChange', ownerChangeController);
//generate pre-repair document  id
router.get('/generatePreRepairId', generatePreRepairDocumentIdController);
//generate job id
router.get('/generateJobId', generateJobIdController);

//add data to the record table
router.post('/addRecordData' , addRecordDataController);


export default router;
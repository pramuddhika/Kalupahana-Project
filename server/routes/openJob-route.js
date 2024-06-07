import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {checkBookingController,
        checkRegisteredVehicleController,
        checkCustomerController,
        customerDataUpdateController,
        customerRegisterController,
        vehicleRegisterController,
        ownerChangeController,
        generatePreRepairDocumentIdController,
        generateJobIdController,
        addRecordDataController,
        addPreRepairDataController,
        addOtherItemsDataController,
        addImagesDataController,
        checkVehicleReopeningJobController,
        getImagesController
       } from '../controllers/openJob-controller.js';



const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'images');
   },
     filename: (req, file, cb) => {
     const uniqueName = `${file.fieldname}_${uuidv4()}${path.extname(file.originalname)}`;
     cb(null, uniqueName);
   }
});
    
const upload = multer({
    storage: storage 
});

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
//check vehicle do not have not close record
router.get('/checkVehicleReopeningJob/:vehicleNumber' , checkVehicleReopeningJobController);


//add data to pre-repair document
router.post('/addPreRepairData', addPreRepairDataController);
//add data to check list tabel
 router.post('/addOtherItemsData', addOtherItemsDataController);
//add imges to scrath mark table
router.post('/addImagesData' , upload.array('images'), addImagesDataController);
//add data to the record table
router.post('/addRecordData' , addRecordDataController);


//get images id from db
router.get('/getImages/:preDocId', getImagesController);


export default router;
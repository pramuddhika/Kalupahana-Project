import express from 'express';
import {addPart,getId_Name,deletePart,editParts,searchPart,
        todayPurchases, AddPurchases,DeletePurchases,
        availbleParts,notAvailable,LowToHigh,HighToLow} from '../controllers/stock-controller.js';

const router = express.Router();

//add part to stock
router.post('/add', addPart);
//display part id & name
router.get('/get', getId_Name);
//edit part details
router.put('/update',editParts);
//delete part from addpart
router.delete('/deletepart/:partID', deletePart);
//serch part data
router.get('/search/:searchID', searchPart);
//get this month purchases data
router.get('/todaypurchases', todayPurchases);
//add part purchases to stock
router.post('/purchases', AddPurchases);
//delete purchases data
router.delete('/delete/:partid/:date/:quantity', DeletePurchases);

//filter availble parts
router.get('/available' , availbleParts);
//filter not availble parts
router.get('/notavailable', notAvailable);
//filter part low 2 hight
router.get('/l2h' , LowToHigh);
//filter part high 2 low 
router.get('/h2l',HighToLow);

export default router;
import express from 'express';
import {addPart,getId_Name,deletePart,editParts,searchPart} from '../controllers/stock-controller.js';

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

//add part purchases to stock
//get all available parts details in stock
//remove use parts quantity from stock 

export default router;
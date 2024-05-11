import express from 'express';
import {addPart,
        getId_Name} from '../controllers/stock-controller.js';

const router = express.Router();

//add part to stock
router.post('/add', addPart);
//display part id & name
router.get('/get', getId_Name);
//edit part details
//delete part from stock
//add part purchases to stock
//get all available parts details in stock
//remove use parts quantity from stock 

export default router;
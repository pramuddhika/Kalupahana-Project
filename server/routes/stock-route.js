import express from 'express';
import {addPart} from '../controllers/stock-controller.js';

const router = express.Router();

//add part to stock
router.post('/add', addPart);
//edit part details
//delete part from stock
//add part purchases to stock
//get all available parts details in stock
//remove use parts quantity from stock 

export default router;
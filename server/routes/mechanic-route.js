import express from 'express';
import {addMechanicController,getMechanicController} from '../controllers/mechanic-controller.js';

const router = express.Router();

//add mechanic details
router.post('/addmechanic', addMechanicController);
//get mechanic data
router.get('/getmechanics' , getMechanicController);

export default router;
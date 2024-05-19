import express from 'express';
import {addMechanicController,getMechanicController,updateMechanicController} from '../controllers/mechanic-controller.js';

const router = express.Router();

//add mechanic details
router.post('/addmechanic', addMechanicController);
//get mechanic data
router.get('/getmechanics' , getMechanicController);
//update mechanic data
router.put('/updatemechanic', updateMechanicController);

export default router;
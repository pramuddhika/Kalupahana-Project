import express from 'express';
import {addMechanicController} from '../controllers/mechanic-controller.js';

const router = express.Router();

//add mechanic details
router.post('/addmechanic', addMechanicController);

export default router;
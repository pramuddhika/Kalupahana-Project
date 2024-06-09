import express from 'express';
import {getvehicleCategoryController
        } from '../controllers/summary-controller.js';

const router = express.Router();

//get number of vehicles bt groups
router.get('/vehiclegroups', getvehicleCategoryController);

export default router;
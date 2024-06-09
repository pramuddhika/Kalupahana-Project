import express from 'express';
import {
    getvehicleCategoryController,
    getvehicleBrandsController
    } from '../controllers/summary-controller.js';

const router = express.Router();

//get number of vehicles by groups
router.get('/vehiclegroups', getvehicleCategoryController);
//get number of vehicle by brand
router.get('/vehicleBrands', getvehicleBrandsController);

export default router;
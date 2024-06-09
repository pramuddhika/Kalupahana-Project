import express from 'express';
import {
    getvehicleCategoryController,
    getvehicleBrandsController,
    completeJobsController,
    getHolidayscontroller,
    getEmployeeCountController,
    getDetailEmployeeController
    } from '../controllers/summary-controller.js';

const router = express.Router();

//get number of vehicles by groups
router.get('/vehiclegroups', getvehicleCategoryController);
//get number of vehicle by brand
router.get('/vehicleBrands', getvehicleBrandsController);
//get completed number of jobs
router.get('/completeJobs', completeJobsController);
//geta holidays
router.get('/getHolidays', getHolidayscontroller);
//emaployee count
router.get('/employeeCount',getEmployeeCountController);
//employee details count
router.get('/detailEmployee', getDetailEmployeeController);

export default router;
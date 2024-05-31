import express from "express";
import { getJobUpdateDataController,
         getAllocatedMechanicsController
 } from "../controllers/updateJob-controller.js";

const router = express.Router();

//check ongoing jobs
router.get('/checkJobs/:updateNumber', getJobUpdateDataController);
//get allocated mechanic list for one vehicle
router.get('/getAllocatedMechanics/:updateJobId', getAllocatedMechanicsController);
//get not resign mechanic data list 

export default router;
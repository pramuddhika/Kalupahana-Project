import express from "express";
import { getJobUpdateDataController } from "../controllers/updateJob-controller.js";

const router = express.Router();

//check ongoing jobs
router.get('/checkJobs/:updateNumber', getJobUpdateDataController);

export default router;
import express from "express";
import { getJobUpdateDataController,
         getAllocatedMechanicsController,
         getInChargeMechanicsController,
         assignMechanicController,
         checkAssignMechanicController,
         getMechanicNoteController,
         updateMechanicNoteController
 } from "../controllers/updateJob-controller.js";

const router = express.Router();

//check ongoing jobs
router.get('/checkJobs/:updateNumber', getJobUpdateDataController);
//get allocated mechanic list for one vehicle
router.get('/getAllocatedMechanics/:updateJobId', getAllocatedMechanicsController);
//get not resign mechanic data list 
router.get('/getInChargeMechanics', getInChargeMechanicsController);
//asign mechanic to job
router.post('/addMechanic', assignMechanicController);
//check mechanic is assign to job or not
router.get('/checkAssign/:updateNoteMecId/:updateJobId', checkAssignMechanicController);
//get mechanic notes
router.get('/mechanicNotes/:updateJobId', getMechanicNoteController);
//update mechanic note and status
router.put('/updateMechanicNote', updateMechanicNoteController);

export default router;
import express from "express";
import { getJobUpdateDataController,
         getAllocatedMechanicsController,
         getInChargeMechanicsController,
         assignMechanicController,
         checkAssignMechanicController,
         getMechanicNoteController,
         updateMechanicNoteController,
         sendUpdatesController,
         generateMessageIdController,
         addMessageController,
         getSendMesageController,
         addUsePartsController,
         getUsePartsController,
         generateJobCloseIdController,
         addCloseJobDataController
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

//send email
router.post('/sendUpdates', sendUpdatesController);
//generate message Id
router.get('/generateMessageId', generateMessageIdController);
//add send message to data base
router.post('/addMessage', addMessageController);
//get send message from db
router.get('/getSendMessage/:updateJobId' , getSendMesageController);

//add use part data to database
router.post('/addUseParts', addUsePartsController);
//get use part data
router.get('/getusePArts/:updateJobId', getUsePartsController);

//generate doc id
router.get('/generateJobCloseId', generateJobCloseIdController);
//add close jon data
router.post('/addCloseJonData', addCloseJobDataController);



export default router;
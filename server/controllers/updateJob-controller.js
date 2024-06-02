import {generateJobIdService,
        getAllocatedMechanicsService,
        getInChargeMechanicsService,
        assignMechanicService,
        checkAssignMechanicService,
        getMechanicNoteService,
        updateMechanicNoteService,
        sendUpdatesService,
        generateMessageIdService,
        addMessageService,
        getSendMesageService
       } from '../services/updateJob-service.js';

//############################ get job update main data set - start ##############################
export const getJobUpdateDataController = async(req,res) => {
    const {updateNumber} = req.params;

    try{
        const data = await generateJobIdService(updateNumber);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//############################ get job update main data set - end   ##############################

//########################### get allocated mechaic list - start   ###############################
export const getAllocatedMechanicsController = async(req,res) => {
    const {updateJobId} = req.params;

    try{
        const data = await getAllocatedMechanicsService(updateJobId);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//########################### get allocated mechaic list - end     ###############################

//########################### get inCharge mechanic data - start   ###############################
export const getInChargeMechanicsController = async(req,res) => {
    try{
        const data = await getInChargeMechanicsService();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//########################### get inChange mechanic data - end     ###############################

//########################### assign mechnic to job - start ######################################
export const assignMechanicController = async(req,res) => {
    const {selectId,updateJobId} = req.body;
    try{
        const data = await assignMechanicService(selectId,updateJobId);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//########################### assign mechnic to job - end   ######################################

//########################## check assign or not - start #########################################
export const checkAssignMechanicController = async(req,res) => {
    const {updateNoteMecId,updateJobId} = req.params;
    try{
        const data = await checkAssignMechanicService(updateNoteMecId,updateJobId);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//########################## check assign or not - end   #########################################

//######################### get mechanic note - Start  ############################################
export const getMechanicNoteController = async(req,res) => {
    const {updateJobId} = req.params;
    try{
        const data = await getMechanicNoteService(updateJobId);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//######################### get mechanic note - end    ############################################

//######################### update mechnic note - satrt ############################################
export const updateMechanicNoteController = async(req,res) => {
    const {note,status,updateJobId,updateNoteMecId} = req.body;
    try{
        const data = await updateMechanicNoteService(note,status,updateJobId,updateNoteMecId);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//######################### update mechanic note - end  ############################################

//############################## send email - start ################################################
export const sendUpdatesController = async (req, res) => {
    const { updateCustomerMail, message} = req.body;
   
    try {
      const data = await sendUpdatesService(updateCustomerMail,message);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
//############################## send email - end   ################################################

//######################## generate message ID - start ###############################
export const  generateMessageIdController = async(req,res) => {
    try{
        const data = await generateMessageIdService();
        return res.json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//######################## generate message ID - end   ###############################

//############################## add message - start ################################################
export const addMessageController = async (req, res) => {
    const {messageId,updateJobId,message} = req.body;
    try {
      const data = await addMessageService(messageId,updateJobId,message);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
//############################## add message - end   ################################################

//######################### get send message - Start  ############################################
export const getSendMesageController = async(req,res) => {
    const {updateJobId} = req.params;
    try{
        const data = await getSendMesageService(updateJobId);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//######################### get send message - end    ############################################
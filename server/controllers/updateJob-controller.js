import {generateJobIdService,
        getAllocatedMechanicsService,
        getInChargeMechanicsService,
        assignMechanicService,
        checkAssignMechanicService,
        getMechanicNoteService
       } from '../services/updateJob-service.js';

//############################ get job update main data set - start ##############################
export const getJobUpdateDataController = async(req,res) => {
    const {updateNumber} = req.params;

    try{
        const data = await generateJobIdService(updateNumber);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json({message:"Server side error!"});
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
        return res.status(500).json({message:err.message});
    }
}
//########################### get allocated mechaic list - end     ###############################

//########################### get inCharge mechanic data - start   ###############################
export const getInChargeMechanicsController = async(req,res) => {
    try{
        const data = await getInChargeMechanicsService();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json({message:"Server side error"});
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
        return res.status(500).json({message:"Server side error"});
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
        return res.status(500).json({message:err.message});
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
        return res.status(500).json({message:err.message});
    }
}
//######################### get mechanic note - end    ############################################
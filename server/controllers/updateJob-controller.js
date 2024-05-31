import {generateJobIdService,
        getAllocatedMechanicsService 
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
        return res.status(500).json({message:"Server side error"});
    }
}
//########################### get allocated mechaic list - end     ###############################
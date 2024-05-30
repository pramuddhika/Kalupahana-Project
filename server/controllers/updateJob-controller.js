import {generateJobIdService} from '../services/updateJob-service.js';

//############################ get job update main data set - start ##############################
export const getJobUpdateDataController = async(req,res) => {
    const {vehicleNumber} = req.params;

    try{
        const data = await generateJobIdService(vehicleNumber);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("Server side error!");
    }
}
//############################ get job update main data set - end   ##############################
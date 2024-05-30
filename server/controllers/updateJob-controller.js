import {generateJobIdService} from '../services/updateJob-service.js';

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
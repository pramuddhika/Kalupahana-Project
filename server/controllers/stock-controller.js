import {addPartService} from '../services/stock-service.js';

//##################### add part details - satrt #########################
export const addPart = async (req,res) => {

    const {partID,partName,description} = req.body;

    try{
        const data = await addPartService(partID,partName,description);
    }catch(err){
        return res.status(500).json(err.message);
    }
}
//##################### add part details - end  #########################

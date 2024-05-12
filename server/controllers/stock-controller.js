import {addPartService,
        getId_NameService} from '../services/stock-service.js';

//##################### add part details - satrt #########################
export const addPart = async (req,res) => {

    const {partID,partName,partDescription} = req.body;

    try{
        const data = await addPartService(partID,partName,partDescription);
    }catch(err){
        return res.status(500).json(err.message);
    }
}
//##################### add part details - end  #########################

//##################### get part name & ID - start #######################
export const getId_Name = async (req,res) => {
   
    try{
        const data = await getId_NameService();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err.message);
    }
}
//##################### get part name & ID - end   #######################

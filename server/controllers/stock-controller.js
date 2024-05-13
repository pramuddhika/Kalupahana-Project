import {addPartService,
        getId_NameService,
        deletePartService,editPartsService} from '../services/stock-service.js';

//##################### add part details - satrt #########################
export const addPart = async (req,res) => {
    const {partID,partName,partDescription} = req.body;
    try{
        const data = await addPartService(partID,partName,partDescription);
        return res.status(200).json(data);
    }catch(err){
        if (err.code == 'ER_DUP_ENTRY') {
            return res.status(409).json('Part Id or Part Name alread taken!');
        } else {
            return res.status(500).json('Server side error!');
        }
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

//##################### delete part - satrt ##############################
export const deletePart = async (req,res) => {
    const {partID} = req.params;
    try{
        const data = await deletePartService(partID);
        
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err.message);
    }
}
//##################### delete part - end   ##############################

//##################### edit part details - start ########################
export const editParts = async (req,res) => {
    const {editPartName,editPartDescription,editPartID} = req.body;
    try{
        const data = await editPartsService(editPartName,editPartDescription,editPartID);
        return res.status(200).json(data);
    }catch(err){
        if (err.code == 'ER_DUP_ENTRY') {
            return res.status(409).json('Part Name alread taken!');
        } else {
            return res.status(500).json('Server side error!');
        }
    }
}
//##################### edit part details - end   ########################

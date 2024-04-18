import {getSpaceDataService,
        updateSpaceDataService} from '../services/settings-services.js';

//############################ get space data - start ######################################
export const getSpaceData = async (req,res) => {
  try{
    const data = await getSpaceDataService();
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//############################ get space data - end   ######################################

//########################### update space data - start #####################################
export const updateSpaceData = async (req,res) => {
  const { totalSpace, onlineSpaces} = req.body;
  try{
    const data = await updateSpaceDataService(totalSpace,onlineSpaces);
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//########################### update space data - end   #####################################
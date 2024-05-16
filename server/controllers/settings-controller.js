import {getSettingsTableDataService,
        updateSpaceDataService,
        addHolidayService} from '../services/settings-services.js';

//############################ get space data & borth notification times - start ######################################
export const getSettingsTableDataController = async (req,res) => {
  try{
    const data = await getSettingsTableDataService();
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//############################ get space data & borth notification times - end   ######################################

//########################### update space data - start #####################################
export const updateSpaceDataController = async (req,res) => {
  const { totalSpace, BookingSpaces} = req.body;
  try{ 
    const data = await updateSpaceDataService(totalSpace,BookingSpaces);
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//########################### update space data - end   #####################################

//########################### add holiday - start ###########################################
export const addHoliday = async (req,res) => {
  const {dates} = req.body;
  try{
    const data = await addHolidayService(dates);
    return res.status(200).json(data);
  }catch(err){
    if (err.code == 'ER_DUP_ENTRY') {
      return res.status(409).json('Date already exists as a holidays!');
  } else {
      return res.status(500).json('Server side error!');
  }  
  }
};
//########################### add holiday - end   ###########################################
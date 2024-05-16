import {getSettingsTableDataService,
        updateSpaceDataService,
        updateNextDayTimeService,
        recordCheckService,
        addHolidayService,
        AddSpecialistAreaService} from '../services/settings-services.js';

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
  const { totalSpace, bookingSpace} = req.body;
  try{ 
    const data = await updateSpaceDataService(totalSpace,bookingSpace);
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//########################### update space data - end   #####################################

//################## update next day notification time  - start ##############################
export const updateNextDayTimeController = async (req,res) => {
  const {nextdayTime} = req.body;
  try{
    const data = await updateNextDayTimeService(nextdayTime);
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//################## update next day notification time  - end   ##############################

//################# update record check time - start #########################################
export const recordCheckController = async (req,res) => {
  const {recordsTime} = req.body;
  try{
    const data = await recordCheckService(recordsTime);
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//################ updat record check time - end   ##########################################

//########################### add holiday - start ###########################################
export const addHoliday = async (req,res) => {
  const {date} = req.body;
  try{
    const data = await addHolidayService(date);
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

//########################### add specialist area - start ###########################################
export const AddSpecialistAreaController = async (req,res) => {
  const {speciallistArea} = req.body;
  try{
    const data = await AddSpecialistAreaService(speciallistArea);
    return res.status(200).json(data);
  }catch(err){
    if (err.code == 'ER_DUP_ENTRY') {
      return res.status(409).json('Date already exists as a holidays!');
  } else {
      return res.status(500).json('Server side error!');
  }  
  }
};
//########################### add specialist are - end   ###########################################


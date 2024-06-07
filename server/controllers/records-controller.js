import {getRecordsDataService,
       checkVehicleService
       } from '../services/records-Service.js';

//################################## check record data - start ############################
export const checkVehicleController = async(req,res) => {
    const{searchNumber} = req.params;
    
    try{
     const data = await checkVehicleService(searchNumber);
     return res.status(200).json(data);
    }catch(err){
     return res.status(500).json(err);
    }
 }
 //################################## check record data - end   ############################

//################################## get record data - start ############################
export const getRecordsDataController = async(req,res) => {
   const{recordNumber} = req.params;

   try{
    const data = await getRecordsDataService(recordNumber);
    return res.status(200).json(data);
   }catch(err){
    return res.status(500).json(err);
   }
}
//################################## get record data - end   ############################
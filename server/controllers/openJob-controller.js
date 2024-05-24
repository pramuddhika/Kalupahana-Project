import {checkVehicleService} from '../services/openJob-service.js';

//################ check vehicle number - start ######################
export const checkVehicleController = async(req,res) => {
   const {searchNumber} = req.body;
   try{
    const data = await checkVehicleService(searchNumber);
    return res.status(200).json(data);
   }catch(err){
    return res.status(500).json('Server side Error!');
   }
} 
//################ check vehicle number - end   ######################

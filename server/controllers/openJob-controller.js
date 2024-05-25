import {checkBookingService,
        checkRegisteredVehicleService,
        checkCustomerService} from '../services/openJob-service.js';

//################# before open job check vehicle is booked one - start ###################
export const checkBookingController = async(req,res) => {
   const {jobOpenNumber} = req.body;
   
   try{
       const data = await checkBookingService(jobOpenNumber);
       return res.status(200).json(data);
   }catch(err){
       return res.status(500).json("Serer side error!");
   }
}
//#####################   check booking - end  ############################################

//##################### check vehicle is registered or not - start ########################
export const  checkRegisteredVehicleController = async(req,res) => {
    const {jobOpenNumber} = req.params;

    try{
        const data = await checkRegisteredVehicleService(jobOpenNumber);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("Server side error!");
    }
}
//##################### check vehicle is registered or not - end   ########################

//#################### get customer data - satrt ##########################################
export const checkCustomerController = async(req,res) => {
    const {NICnumber} = req.params;

    try{
        const data = await checkCustomerService(NICnumber);
        return res.data(200).json(data);
    }catch(err){
        return res.status(500).json(err.message);
    }
}
//#################### get customer data - end   ##########################################
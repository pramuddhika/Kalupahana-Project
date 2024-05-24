import {checkBookingService} from '../services/openJob-service.js';

//################# before open job check vehicle is booked one - start ###################
export const checkBookingController = async(req,res) => {
   const {jobOpenNumber} = req.body;

   try{
       const data = await checkBookingService(jobOpenNumber);
       return res.status(200).json(data);
   }catch(err){
       return res.status(500).json(err.message);
   }
}
//#####################   check booking - end  ############################################
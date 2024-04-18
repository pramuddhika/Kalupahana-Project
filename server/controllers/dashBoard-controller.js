import { bookingNumberService } from "../services/dashBoard-service.js";

//############# get booking count - start #############################
export const bookingNumber = async (req,res) => {
  try{
   const data = await bookingNumberService();
   return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//############# get booking count -  end  #############################
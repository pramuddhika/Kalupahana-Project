import { bookingNumberService,
         getJobNumberservice,
         getFreeBloksService} from "../services/dashBoard-service.js";

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

//############ get jon Number - start  ################################
export const getJobNumberController = async (req,res) => {
  try{
    const data = await getJobNumberservice();
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err);
  }
}
//############ get jon Number - end    ################################

//############ get free blocks - start  ################################
export const getFreeBloksController = async (req,res) => {
  try{
    const data = await getFreeBloksService();
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err);
  }
}
//############ get free blocks - end    ################################
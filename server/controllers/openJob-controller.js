import {checkBookingService,
        checkRegisteredVehicleService,
        checkCustomerService,
        customerDataUpdateService,
        customerRegisterService,
        vehicleRegisterService,
        ownerChangeService} from '../services/openJob-service.js';

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
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("Server side error!");
    }
}
//#################### get customer data - end   ##########################################

//######################### update customer data - start ###################################
export const customerDataUpdateController = async(req,res) => {
    const {customerName,customerEmail,customerPhoneNumber,NICnumber} = req.body;

    try{
        const data = await customerDataUpdateService(customerName,customerEmail,customerPhoneNumber,NICnumber);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("Server side error!");
    }
}
//######################### update customer data - end   ###################################

//######################### register customer data - start ###################################
export const customerRegisterController = async(req,res) => {
    const {customerName,customerEmail,customerPhoneNumber,NICnumber} = req.body;

    try{
        const data = await customerRegisterService(customerName,customerEmail,customerPhoneNumber,NICnumber);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("server side error!");
    }
}
//######################### register customer data - end   ###################################

//######################## register vehicle - satrt  #########################################
export const vehicleRegisterController = async (req,res) => {
    const {vehicleNumber,brand,model,fuleType,NICnumbe} = req.body;
    try{
        const data = await vehicleRegisterService(vehicleNumber,brand,model,fuleType,NICnumbe);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("server side error!");
    }
}
//######################## register vehicle - end    #########################################

//######################## vehicle ownerShip change - satrt  #################################
export const ownerChangeController = async (req,res) => {
    const {NICnumber,vehicleNumber} = req.body;
    try{
        const data = await ownerChangeService(NICnumber,vehicleNumber);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("server side error!");
    }
}
//######################## vehicle ownerShip change - end    #################################
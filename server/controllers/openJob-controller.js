import {checkBookingService,
        checkRegisteredVehicleService,
        checkCustomerService,
        customerDataUpdateService,
        customerRegisterService,
        vehicleRegisterService,
        ownerChangeService,
        generatePreRepairDocumentIdService,
        generateJobIdService,
        addRecordDataService,
        addPreRepairDataService,
        addOtherItemsDataService,
        addImagesDataService,
        checkVehicleReopeningJobService
    } from '../services/openJob-service.js';

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
    const {vehicleNumber,brand,model,fuleType,NICnumber} = req.body;
    try{
        const data = await vehicleRegisterService(vehicleNumber,brand,model,fuleType,NICnumber);
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

//#################### generate pre repair document id - start ###############################
export const generatePreRepairDocumentIdController = async(req,res) => {
    try{
        const data = await generatePreRepairDocumentIdService();
        return res.json(data);
    }catch(err){
        return res.status(500).json("Server side error!");
    }
}
//#################### generate pre repair document id - end   ###############################

//#################### generate repair job id - start ###############################
export const generateJobIdController = async(req,res) => {
    try{
        const data = await generateJobIdService();
        return res.json(data);
    }catch(err){
        return res.status(500).json("Server side error!");
    }
}
//#################### generate repair job id - end   ###############################

//################### check vehicle not have open job - start #####################################
export const checkVehicleReopeningJobController = async(req,res) => {
    const{vehicleNumber} = req.params;
    
    try{
        const data = await checkVehicleReopeningJobService(vehicleNumber);
        return res.status(200).json(data);
    }catch(err){
        console.log(err.message)
        return res.status(500).json("Server side error!");
    }
}
//################### check vehicle not have open job - end   #####################################




//################### add data to pre-repair   - start ##############################
export const addPreRepairDataController = async (req, res) => {
    const { preDocId, vehicleFault, additionalNote, checkList } = req.body;
    const { spareTire, tireJack, lugWrench, toolBox, jumperCable } = checkList;

    try {
        const data = await addPreRepairDataService(preDocId, vehicleFault, additionalNote, spareTire, tireJack, lugWrench, toolBox, jumperCable);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json("Server side error!");
    }
};

//################### add data to pre-repair   - end   ##############################

//################### add data to check list tabel - start ##############################
export const addOtherItemsDataController = async (req, res) => {
    const { preDocId, otherItems } = req.body;
    
    const items = otherItems.split(',').map(item => item.trim()).filter(item => item.length > 0);

    try {
        const promises = items.map(item => addOtherItemsDataService(preDocId, item));
        const data = await Promise.all(promises);
        return res.status(200).json(data);
    } catch (err) {
        console.error("Error adding other items data:", err);
        return res.status(500).json("Server side error!");
    }
}
//################### add data to check list tabel - end   ##############################

//################### add data to scrath mark table - start ##############################
export const addImagesDataController = async(req,res) => {
    const {preDocId} = req.body;
    
    try {
        const images = req.files.map(file => file.filename);
        const data = await addImagesDataService(preDocId, images);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}
//################### add data to scrath mark table - end   ##############################

//################### add data to record table - start ##############################
export const addRecordDataController = async(req,res) => {
    const {jobId,vehicleNumber,dateString,preDocId} = req.body;
    try{
        const data = await addRecordDataService(jobId,vehicleNumber,dateString,preDocId);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json("Server side error!");
    }
}
//################### add data to record table - end   ##############################
import { addBookingService, 
         getAllBookings,
         cancelBookingService,
         cancelCheckingService } from '../services/booking-service.js';

//#####################  get all resevation data - start ##################################
export const bookingInfo = async (req,res) => {
    try {
        const data = await getAllBookings();
        return res.status(200).json(data);
    }catch (err){
        return res.status(500).json(err.message);
    }
};
//#####################  get all resevation data - end   ##################################

//#####################  Add resevation data - Start #######################################
export const addBooking = async (req,res) => {
    const {vehicleNumber,contactNumber,message,date} = req.body;
    
    //validate inputs
    if (!vehicleNumber || !contactNumber || !message || !date) {
        return res.status(400).json('All fields are required.');
    }

    try {
        const data = await addBookingService(vehicleNumber,contactNumber,message,date);
        return res.status(200).json(data);
    } catch (err) {
        if (err.code == 'ER_DUP_ENTRY') {
            return res.status(409).json('Booking already exists for the provided vehicle number!');
        } else {
            return res.status(500).json('Server side error!');
        }
    }
};
//#####################  Add resevation data - end   #######################################

//##################### Check before cancel - Start  #######################################
export const cancelChecking = async (req,res) => {
    const vehicleNumber = req.params.vehicleNumber;

    try{
        const data = await cancelCheckingService (vehicleNumber);
        res.json(data);
    }catch(err){
        res.status(500).json(err.message);
    }
};
//##################### Check before cancel - End  #########################################

//#####################  Cancel resevation data - Start ####################################
export const cancelBooking = async (req,res) => {
    const {vehicleNumber} = req.body;

    try{
        const data = await cancelBookingService(vehicleNumber);
        res.json({data});
    } catch (err){
        res.status(500).json('Server side error!');
    }
}
//#####################  Cancel resevation data - end   ####################################

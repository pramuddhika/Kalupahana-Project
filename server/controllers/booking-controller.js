import { addBookingService, 
         getAllBookings,
         cancelBookingService,
         cancelCheckingService,
         getTodayBookings,
         totalBookingService,
         changeDateService } from '../services/booking-service.js';
import axios from 'axios';

//#####################  Add resevation data - Start #######################################
export const addBooking = async (req,res) => {
    const {vehicleNumber,contactNumber,vehicleFault,reservedDate} = req.body;
    
    //validate inputs
    if (!vehicleNumber || !contactNumber || !vehicleFault || !reservedDate) {
        return res.status(400).json('All fields are required.');
    }

    try {
        const data = await addBookingService(vehicleNumber,contactNumber,vehicleFault,reservedDate);
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

//#####################  get resevation data - start ##################################
export const bookingInfo = async (req,res) => {
    try {
        const data = await getAllBookings();
        return res.status(200).json(data);
    }catch (err){
        return res.status(500).json(err.message);
    }
};
//#####################  get resevation data - end   ##################################

//#####################  get today resevation data - start ##################################
export const todayBookingInfo = async (req,res) => {
    try {
        const data = await getTodayBookings();
        return res.status(200).json(data);
    }catch (err){
        return res.status(500).json(err.message);
    }
};
//#####################  get today resevation data - end   ##################################

//##################### Checking booking data for updating  - Start  #######################################
export const cancelChecking = async (req,res) => {
    const {vehicleNumber} = req.params;
    
    try{
        const data = await cancelCheckingService (vehicleNumber);
        return res.status(200).json(data);
    }catch(err){
        res.status(500).json(err.message);
    }
};
//##################### Checking booking data for updating  - end  #########################################

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

//##################### change booking date - start ########################################
export const changeDate = async (req,res) => {
    const {reservedDate,vehicleNumber} = req.body;

    try{
        const response = await axios.get('http://localhost:8000/api/settings/getholidays');
        const holidays = response.data.map(item => item.holidays);
        if (holidays.includes(reservedDate)) {
            return res.status(400).json('That\'s a holiday');
        }

        const data = await changeDateService(reservedDate,vehicleNumber);
        res.json(data);
    }catch(err){
        res.status(500).json('Server side Error!');
    }
};
//##################### change booking date - end  ########################################

//#####################  get total booking number - start ##################################
export const totalBookingController = async (req,res) => {
    try {
        const data = await totalBookingService();
        return res.status(200).json(data);
    }catch (err){
        return res.status(500).json(err.message);
    }
};
//#####################  get total booking number - end   ##################################

//##################### allowed controller - start ##########################################
export const allowedController = async(req,res) =>{
    try {
        // Fetch settings
        const settingsResponse = await axios.get('http://localhost:8000/api/settings/getsettings');
        const bookingSpace = settingsResponse.data[0].bookingSpace;

        // Fetch total bookings
        const bookingResponse = await axios.get('http://localhost:8000/api/booking/totalBooking');
        const count = bookingResponse.data.count;

        // Compare and return response
        if (count < bookingSpace) {
            return res.status(200).json({ message: 'Can' });
        } else {
            return res.status(200).json({ message: 'Cannot' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error occurred' });
    }
};
//##################### allowed controller - end   ##########################################



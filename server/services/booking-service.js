import {db} from '../.env/db-env.js'

//#####################  Add resevation data - Start #######################################
export const addBookingService = (vehicleNumber,contactNumber,message,date) => {
    return new Promise( (resolve,reject) => {
        const q = `INSERT INTO booking (vehicleNumber,contactNumber,message,date) VALUES (?,?,?,?)`;

        db.query(q, [vehicleNumber,contactNumber,message,date], (err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('Your reservation is Successful!');
            }
        });
    });
};
//#####################  Add resevation data - end   #######################################

//#####################  get resevation data - start ##################################
export const getAllBookings = () => {
    return new Promise ( (resolve, reject) => {
        const q = `SELECT vehicleNumber,contactNumber,DATE_FORMAT(date, '%Y-%m-%d') as date,message FROM booking WHERE status = 'pending'`;

        db.query(q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const bookingDetails = data.map(booking => ({
                    vehicleNumber : booking.vehicleNumber,
                    contactNumber : booking.contactNumber,
                    date :  booking.date,
                    message : booking.message
                }));
                resolve(bookingDetails);
            }
        });
        
    });
};
//#####################  get resevation data - end   ###################################

//#####################  get today resevation data - start ##################################
export const getTodayBookings = () => {
    return new Promise ( (resolve, reject) => {
        
        const q = `SELECT vehicleNumber,contactNumber,DATE_FORMAT(date, '%Y-%m-%d') as date,message FROM booking WHERE DATE(date)=CURDATE() && status = 'pending' `;

        db.query(q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const bookingDetails = data.map(booking => ({
                    vehicleNumber : booking.vehicleNumber,
                    contactNumber : booking.contactNumber,
                    date :  booking.date,
                    message : booking.message
                }));
                resolve(bookingDetails);
            }
        });
        
    });
};
//#####################  get today resevation data - end   ###################################

//##################### Checking booking data for updating  - Start   #######################################
export const cancelCheckingService = (vehicleNumber) => {
    return new Promise ( (resolve, reject) => {
        const q = `SELECT vehicleNumber,contactNumber,DATE_FORMAT(date, '%Y-%m-%d') as date,message FROM booking WHERE vehiclenumber = ?`;
        db.query(q,[vehicleNumber], (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const searchDetails = data.map(booking => ({
                    vehicleNumber : booking.vehicleNumber,
                    contactNumber : booking.contactNumber,
                    date :  booking.date,
                    message : booking.message
                }));
                resolve(searchDetails);
            }
        })
    })
}
//##################### Checking booking data for updating  - end  #######################################

//#####################  Cancel resevation data - end   #######################################
export const cancelBookingService = (vehicleNumber) => {
    return new Promise( (resolve, reject) => {
        const q = `DELETE FROM booking WHERE vehicleNumber = ?`;
        db.query(q,[vehicleNumber] , (err,data) => {
            if(err){
                reject(err);
            }else {
                resolve('Booking Cancelled successfully!');
            }
        })
    })
}
//#####################  Cancel resevation data - end   #######################################

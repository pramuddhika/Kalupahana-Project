import {db} from '../.env'

//#####################  Add resevation data - Start #######################################
export const addBookingService = (vehicleNumber,contactNumber,vehicleFault,reservedDate) => {
    return new Promise( (resolve,reject) => {
        const q = `INSERT INTO booking (VEHICLE_NUMBER,CONTACT_NUMBER,VEHICLE_FAULT,RESERVED_DATE) VALUES (?,?,?,?)`;

        db.query(q, [vehicleNumber,contactNumber,vehicleFault,reservedDate], (err,data) => {
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
        const q = `SELECT VEHICLE_NUMBER,CONTACT_NUMBER,DATE_FORMAT(RESERVED_DATE, '%Y-%m-%d') as RESERVED_DATE,VEHICLE_FAULT FROM booking WHERE STATUS = 'pending'`;

        db.query(q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const bookingDetails = data.map(booking => ({
                    vehicleNumber : booking.VEHICLE_NUMBER,
                    contactNumber : booking.CONTACT_NUMBER,
                    reservedDate :  booking.RESERVED_DATE,
                    vehicleFault : booking.VEHICLE_FAULT
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
        const q = `SELECT vehicleNumber,contactNumber,DATE_FORMAT(date, '%Y-%m-%d') as date,message FROM booking WHERE vehiclenumber = ? && status = 'pending'`;
        db.query(q,[vehicleNumber], (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                resolve(data);
            }
        })
    })
}
//##################### Checking booking data for updating  - end  #######################################

//#####################  Cancel resevation data - end   #######################################
export const cancelBookingService = (vehicleNumber) => {
    return new Promise( (resolve, reject) => {
        const q = `UPDATE booking SET status = 'canceled' WHERE vehicleNumber = ? && status = 'pending' `;
        db.query(q,[vehicleNumber] , (err,data) => {
            if(err){
                reject(err);
            }else {
                resolve('Booking Cancelled successfully!');
            }
        })
    });
};
//#####################  Cancel resevation data - end   #######################################

//##################### change booking Date - Start ###########################################
export const changeDateService = (date,vehicleNumber) => {
    return new Promise ( (resolve, reject) => {
        const q = `UPDATE booking SET date = ? WHERE vehicleNumber = ? && status = 'pending'`;
        db.query( q, [date,vehicleNumber], (err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('Date Updated!')
            }
        })
    });
};
//##################### change booking Date - end   ###########################################

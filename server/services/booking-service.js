import {db} from '../.env/db-env.js'

//#####################  get all resevation data - start ##################################
export const getAllBookings = () => {
    return new Promise ( (resolve, reject) => {
        const q = `SELECT * FROM booking`;

        db.query(q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                resolve(data);
            }
        });
        
    });
};
//#####################  get all resevation data - end   ###################################

//#####################  Add resevation data - Start #######################################
export const addBookingService = (vehicleNumber,customerName,contactNumber,vehicleCategory,message,date) => {
    return new Promise( (resolve,reject) => {
        const q = `INSERT INTO booking (vehicleNumber,customerName,contactNumber,vehicleCategory,message,date) VALUES (?,?,?,?,?,?)`;

        db.query(q, [vehicleNumber,customerName,contactNumber,vehicleCategory,message,date], (err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('Your reservation is Successful!');
            }
        });
    });
};
//#####################  Add resevation data - end   #######################################

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

//##################### Checking cancel data  - Start   #######################################
export const cancelCheckingService = (vehicleNumber) => {
    return new Promise ( (resolve, reject) => {
        const q = `SELECT * FROM booking WHERE vehicleNumber = (?)`;
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
//##################### Checking cancl data  - end      #######################################
import {db} from '../.env';

//############## check vehicle is online book vechicle or not ###################
export const  checkBookingService = async(jobOpenNumber) => {
    return new Promise( (resolve,reject) => {

        const check = `SELECT VEHICLE_NUMBER
                       FROM booking
                       WHERE VEHICLE_NUMBER = ? AND STATUS='pending'`;

        db.query(check,[jobOpenNumber],(err,data)=> {
            if(err){
                reject(err);
                return;
            }else if (data.length === 0 ){
                resolve("Not a online booked vehicle!")
                return;
            }

            const changeStatus = `UPDATE booking
                                  SET STATUS = 'completed'
                                  WHERE VEHICLE_NUMBER = ? AND STATUS='pending'`;

            db.query(changeStatus,[jobOpenNumber], (err,data)=> {
                if(err){
                    reject(err);
                    return;
                }
                resolve('Online booked vehicle!');
            })
        });
    });
}
//######################### check vehicle - end  ################################

//##################### check vehicle is registered or not - start ########################
export const checkRegisteredVehicleService = async (jobOpenNumber) => {
    return new Promise ( (resolve,reject) => {

        const check = `SELECT VEHICLE_NUMBER,NIC_NUMBER
                       FROM vehicle
                       where VEHICLE_NUMBER =?`;

        db.query(check,[jobOpenNumber], (err,data) => {
           if(err){
             reject(err);
            return;
           }else if (data.length === 0 ){
             resolve("NEW");
            return;
           }else {
            const checkVehicleData = data.map(vehicle => ({
                vehicleNumber : vehicle.VEHICLE_NUMBER,
                NICnumber     : vehicle.NIC_NUMBER
            }) );
            resolve(checkVehicleData);
            return;
           }
        });
    });
}
//##################### check vehicle is registered or not - end   ########################

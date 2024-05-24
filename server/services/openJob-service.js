import {db} from '../.env';

//################ check vehicle number - start ######################
export const checkVehicleService = async (searchNumber) => {
    return new Promise( (resolve,reject) => {

        const vehicle = `SELECT * FROM vehicle
                         WHERE VEHICLE_NUMBER = ? `;
        
        db.query(vehicle,[searchNumber], (err,data) => {
            if(err){
                reject(err);
                return;
            }
        } )                  
    })
}
//################ check vehicle number - end   ######################

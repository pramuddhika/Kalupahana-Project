import { resolve } from 'path';
import {db} from '../env.js';


//##########################  get vehicle data by groups - start ##############################
export const getvehicleCategoryService = () => {
    return new Promise( (resolve,reject) => {
        const q = `SELECT FULE_TYPE,COUNT(VEHICLE_NUMBER) AS NUMBER
                   FROM vehicle
                   GROUP BY FULE_TYPE`;

        db.query(q,(err,data) => {
            if(err){
                reject({ message:"Server side error!"});
            }else if ( !data || data.length === 0){
                reject({message:'Data can not be found!'});
            }else {
                const vehicleFuleType = data.map(list => ({
                    fuleType : list.FULE_TYPE,
                    count    : list.NUMBER,
                }));
                resolve({vehicleFuleType});
            }
        })
    })
}
//##########################  get vehicle data by groups - end   ##############################
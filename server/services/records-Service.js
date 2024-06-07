import { resolve } from "path"
import {db} from '../env.js';

//################################## check record data - start ############################
export const checkVehicleService = (searchNumber) => {
    return new Promise( (resolve,reject) => {
        const record = `SELECT *
                        FROM records
                        WHERE VEHICLE_NUMBER = ?`;

        db.query(record,[searchNumber], (err,data)=> {
            if(err){
                reject({message:'Server side error!'});
                return;
            }else if(data.length === 0){
                reject({message:'No data founed!'});
                return;
            }else{
                resolve({message:'record exist'});
            }
        })
    })
}
//################################## check record data - end   ############################

//################################## get record data - start ############################
export const getRecordsDataService = (recordNumber) => {
    return new Promise( (resolve,reject) => {
        const record = `SELECT r.JOB_ID,r.PRE_REPAIR_DOC_ID,r.POST_REPAIR_DOC_ID,
                        c.CUSTOMER_NAME,c.EMAIL,c.PHONE_NUMBER
                        FROM records r
                        INNER JOIN vehicle v ON r.VEHICLE_NUMBER = v.VEHICLE_NUMBER
                        INNER JOIN customer c ON v.NIC_NUMBER = c.NIC_NUMBER
                        WHERE r.VEHICLE_NUMBER = ?`;

        db.query(record,[recordNumber], (err,data)=> {
            if(err){
                reject({message:'Server side error!'});
                return;
            }else if(data.length === 0){
                reject({message:'No data founed!'});
                return;
            }else{
                const record = data.map(list => ({
                    vehicleNumber: recordNumber,
                    jobId : list.JOB_ID,
                    preDoc: list.PRE_REPAIR_DOC_ID,
                    postDoc: list.POST_REPAIR_DOC_ID,
                    customer : list.CUSTOMER_NAME,
                    email : list.EMAIL,
                    phone: list.PHONE_NUMBER
                }));
                resolve(record);
            }
        })
    })
}
//################################## get record data - end   ############################
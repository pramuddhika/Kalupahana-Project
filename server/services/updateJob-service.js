import { resolve } from 'path';
import {db} from '../.env';
import { rejects } from 'assert';
import exp from 'constants';

//############################ get job update main data set - start ##############################
export const generateJobIdService = async(updateNumber) => {
    return new Promise( (resolve,reject) => {
        const check = `SELECT JOB_ID
                       FROM records
                       WHERE VEHICLE_NUMBER = ? AND END_DATE IS NULL`;

        const getInfo = `SELECT r.JOB_ID, p.VEHICLE_FAULT, v.MODEL, v.FULE_TYPE, c.CUSTOMER_NAME, c.EMAIL, c.PHONE_NUMBER
                       FROM records r
                       JOIN vehicle v ON r.VEHICLE_NUMBER = v.VEHICLE_NUMBER
                       JOIN customer c ON v.NIC_NUMBER = c.NIC_NUMBER
                       JOIN pre_repair_document p ON r.PRE_REPAIR_DOC_ID = p.DOCUMENT_ID
                       WHERE r.VEHICLE_NUMBER = ? AND r.END_DATE IS NULL`;

        db.query(check,[updateNumber],(err,data)=>{
            if(err){
                reject({err});
                return;
            } else if (data.length === 0 ){
                resolve({message:"No ongoing job!"});
                return;
            }

            db.query(getInfo,[updateNumber],(err,data) => {
                if(err){
                    reject({err});
                }else{
                    const UpdateJobData = data.map(item => ({
                        jobId : item.JOB_ID,
                        fault : item.VEHICLE_FAULT,
                        model : item.MODEL,
                        fule : item.FULE_TYPE,
                        customer : item.CUSTOMER_NAME,
                        email : item.EMAIL,
                        phoneNumber : item.PHONE_NUMBER,
                        vehicleNumber: updateNumber  
                    }))

                    resolve({UpdateJobData});
                    return;
                }
            })
        })
    })
}
//############################ get job update main data set - end   ##############################

//########################### get allocated mechaic list - start   ###############################
export const getAllocatedMechanicsService = async(updateJobId) => {
    return new Promise ( (resolve,rejects) => {
        const q = `SELECT w.EMPLOYEE_ID, w.STATUS, m.EMPLOYEE_NAME
                   FROM work_allocation w
                   INNER JOIN mechanic m ON w.EMPLOYEE_ID = m.EMPLOYEE_ID
                   WHERE w.JOB_ID = ?`;
        
        db.query(q,[updateJobId],(err,data) => {
            if(err){
                rejects({message:err})
            }else if( !data || data.length === 0 ){
                rejects({message:"Data can't found"});
            }else{
                const allocatedList = data.map(list => ({
                    employeeId : list.EMPLOYEE_ID,
                    employeeName : list.EMPLOYEE_NAME,
                    jobStatus : list.STATUS
                }));
                resolve({allocatedList});
            }
        })
    })
}
//########################### get allocated mechaic list - end     ###############################

//########################### get inCharge mechanic data - start   ###############################
export const getInChargeMechanicsService = () => {
    return new Promise ( (resolve,rejects) => {
        const q = `SELECT EMPLOYEE_ID,EMPLOYEE_NAME,MAIN_AREA,SUB_AREA
                   FROM mechanic
                   WHERE RESIGN_DATE IS NULL`

        db.query(q,(err,data)=> {
            if(err){
                rejects({message:"Error!"})
            }else if( !data || data.length === 0 ){
                rejects({message:"Data can't found"});
            }else{
                const mechanicsList = data.map(list => ({
                    mecId : list.EMPLOYEE_ID,
                    mecName : list.EMPLOYEE_NAME,
                    main : list.MAIN_AREA,
                    sub : list.SUB_AREA
                }));
                resolve({mechanicsList});
            }
        })
    })
}
//########################### get inChange mechanic data - end     ###############################

//########################### assign mechnic to job - start ######################################
export const assignMechanicService  = (selectId,updateJobId) => {
    return new Promise ( ( resolve,rejects) => {
        const q = `INSERT INTO work_allocation
                   (EMPLOYEE_ID,JOB_ID)
                   VALUES (?,?)`;

        db.query(q,[selectId,updateJobId], (err,data) => {
            if(err.code == 'ER_DUP_ENTRY'){
                resolve({message:'Mechanic alread assigned'});
            }
            else if(err){
                rejects({message:err});
            }
            else {
                resolve({message:"Work allocated"});
            }
        })
    })
}
//########################### assign mechnic to job - end   ######################################
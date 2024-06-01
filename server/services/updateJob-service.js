import { resolve } from 'path';
import {db} from '../env.js';
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
    return new Promise ( (resolve,reject) => {
        const q = `SELECT w.EMPLOYEE_ID, w.STATUS, m.EMPLOYEE_NAME
                   FROM work_allocation w
                   INNER JOIN mechanic m ON w.EMPLOYEE_ID = m.EMPLOYEE_ID
                   WHERE w.JOB_ID = ?`;
        
        db.query(q,[updateJobId],(err,data) => {
            if(err){
                reject({message:err})
            }else if( !data || data.length === 0 ){
                reject({message:"Data can't found"});
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
    return new Promise ( (resolve,reject) => {
        const q = `SELECT EMPLOYEE_ID,EMPLOYEE_NAME,MAIN_AREA,SUB_AREA
                   FROM mechanic
                   WHERE RESIGN_DATE IS NULL`

        db.query(q,(err,data)=> {
            if(err){
                reject({message:err})
            }else if( !data || data.length === 0 ){
                reject({message:"Data can't found"});
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
    return new Promise ( ( resolve,reject) => {
        const q = `INSERT INTO work_allocation
                   (EMPLOYEE_ID,JOB_ID)
                   VALUES (?,?)`;

        db.query(q, [selectId, updateJobId], (err, data) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    resolve({ message: 'Mechanic already assigned' });
                } else {
                    reject({ message:"Error!"});
                }
            } else {
                resolve({ message: "Work allocated" });
            }
        });
                
    })
}
//########################### assign mechnic to job - end   ######################################

//########################## check assign or not - start #########################################
export const checkAssignMechanicService = (updateNoteMecId,updateJobId) => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT STATUS,MECHANIC_NOTE 
                   FROM work_allocation
                   WHERE EMPLOYEE_ID = ? AND JOB_ID =? `;

        db.query(q,[updateNoteMecId,updateJobId], (err,data) => {
            if(err){
                reject({message:"Error!"})
            }else if( !data || data.length === 0 ){
                reject({message:"Not assign mechanic for this vehicle"});
            }else{
                const jobStatus = data.map(list => ({
                    status : list.STATUS,
                    note:list.MECHANIC_NOTE
                }))
                resolve({jobStatus});
            }
        })
    })
}
//########################## check assign or not - end   #########################################

//######################### get mechanic note - Start  ############################################
export const getMechanicNoteService = (updateJobId) => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT EMPLOYEE_ID,MECHANIC_NOTE,STATUS
                   FROM work_allocation
                   WHERE JOB_ID =? `;

        db.query(q,[updateJobId], (err,data) => {
            if(err){
                reject({message:"Error!"})
            }else if( !data || data.length === 0 ){
                reject({message:"No note"});
            }else{
                const jobNote = data.map(list => ({
                    mecId : list.EMPLOYEE_ID,
                    mecNote : list.MECHANIC_NOTE,
                }))
                resolve({jobNote});
            }
        })
    })
}
//######################### get mechanic note - end    ############################################

//######################### update mechnic note - satrt ############################################
export const updateMechanicNoteService = (note,status,updateJobId,updateNoteMecId) => {
    return new Promise ( (resolve,reject) => {
        const q = `UPDATE work_allocation
                   SET MECHANIC_NOTE = ?,STATUS =?
                   WHERE JOB_ID = ? AND EMPLOYEE_ID = ? `;

        db.query(q,[note,status,updateJobId,updateNoteMecId], (err,data) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    resolve({message:'Already updated!'});
                } else {
                    reject({message:err.message});
                }
            } else {
                resolve({message:"Successfully updated!"});
            }
        })
    })
}
//######################### update mechanic note - end  ############################################

//############################## send email - start ################################################
export const sendUpdatesService = async (updateCustomerMail, message) => {

    let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  
    let mailOptions = {
      from: EMAIL_USER,
      to: updateCustomerMail,
      subject:'Test',
      text:message,
    };
  
    return transporter.sendMail(mailOptions);
  };
//############################## send email - end   ################################################
import { resolve } from 'path';
import {db} from '../env.js';
import nodemailer from 'nodemailer';
import { rejects } from 'assert';
import exp from 'constants';
const { EMAIL_USER, EMAIL_PASS } = process.env;

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
                reject({message:"Server side error!"});
                return;
            } else if (data.length === 0 ){
                resolve({message:"No ongoing job!"});
                return;
            }

            db.query(getInfo,[updateNumber],(err,data) => {
                if(err){
                    reject({message:"Server side error!"});
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
                reject({message:"Server side error!"})
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
                reject({message:"Server side error!"})
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
                    reject({ message: 'Mechanic already assigned' });
                } else {
                    reject({ message:"Server side error!"});
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
                reject({message:"Server side error!"})
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
                reject({message:"Server side error!"})
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
                    reject({message:'Already updated!'});
                } else {
                    reject({message:"Server side error!"});
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

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
    });
      
    var mailOptions = {
        from: EMAIL_USER,
        to: updateCustomerMail,
        subject: 'Kalupahana Motors - Repair Update',
        text: message
    };
   
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                reject({message:'Server side error!'});
            } else {
                resolve({message:'Email sent!'});
            }
        });
    });
    
};
//############################## send email - end   ################################################

//######################## generate message ID - start ###############################
export const generateMessageIdService = () => {
    return new Promise((resolve, reject) => {
      const q = 'SELECT MAX(SMS_ID) as maxId FROM sms';
      db.query(q, (err, data) => {
        if (err) {
          reject({message:"Server side error!"});
          return;
        }
  
        const maxId = data[0].maxId;
        let newId;
  
        if (maxId) {
          const numericPart = parseInt(maxId.split('-')[2], 15);
          const newNumericPart = String(numericPart + 1).padStart(8, '0');
          newId = `KM-MID-${newNumericPart}`;
        } else {
          newId = 'KM-MID-00000001';
        }
        resolve({MessageId: newId });
      });
    }
  );
}
//######################## generate message ID - end   ###############################

//############################## add message - start ################################################
export const addMessageService  = (messageId,updateJobId,message) => {
    return new Promise ( ( resolve,reject) => {
        const q = `INSERT INTO sms
                   (SMS_ID,JOB_ID,MESSAGE)
                   VALUES (?,?,?)`;

        db.query(q, [messageId,updateJobId,message], (err, data) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    reject({message: 'Message already assigned'});
                } else {
                    reject({message:"Server side error!"});
                }
            } else {
                resolve({ message: "Message send successfully!" });
            }
        });        
    })
}
//############################## add message - end   ################################################

//######################### get mechanic note - Start  ############################################
export const getSendMesageService = (updateJobId) => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT SMS_ID,MESSAGE
                   FROM sms
                   WHERE JOB_ID =? `;

        db.query(q,[updateJobId], (err,data) => {
            if(err){
                reject({message:"Server side error!"})
            }else if( !data || data.length === 0 ){
                reject({message:"No Message"});
            }else{
                const message = data.map(list => ({
                    messageId : list.SMS_ID,
                    message : list.MESSAGE
                }))
                resolve({message});
            }
        })
    })
}
//######################### get mechanic note - end    ############################################

//##################### add part details - satrt #################################################
export const addUsePartsService = (partID, updateJobId, units) => {
    return new Promise((resolve, reject) => {
      const usepart = `INSERT INTO used_part (PART_ID, JOB_ID, QUANTITY)
                       VALUES (?, ?, ?)
                       ON DUPLICATE KEY UPDATE QUANTITY = QUANTITY + VALUES(QUANTITY)`;

      const stock = `UPDATE spare_parts 
                    SET QUANTITY = QUANTITY - ? 
                    WHERE PART_ID = ?`;
  
      db.query(usepart, [partID, updateJobId, units], (err, data) => {
        if (err) {
          reject({ message: "Server side error!" });
        }

        db.query(stock, [units,partID],(err,data) => {
            if (err) {
                reject({ message: "Server side error!" });
            }else {
                resolve({ message: "Part updated!" });
            }
        })
      });
    });
}
//##################### add part details - end   #################################################

//######################### get use part details - Start  ############################################
export const getUsePartsService = (updateJobId) => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT u.PART_ID,u.QUANTITY,s.PART_NAME,s.UNIT
                   FROM used_part u
                   INNER JOIN spare_parts s ON u.PART_ID = s.PART_ID
                   WHERE u.JOB_ID =? `;

        db.query(q,[updateJobId], (err,data) => {
            if(err){
                reject({message:"Server side error!"})
            }else if( !data || data.length === 0 ){
                reject({message:"No note"});
            }else{
                const useParts = data.map(list => ({
                    partId : list.PART_ID,
                    PartName : list.PART_NAME,
                    partQuntity : list.QUANTITY,
                    partUnit : list.UNIT
                }))
                resolve({useParts});
            }
        })
    })
}
//######################### get use part details - end    ############################################

//#################### generate post repair document id - start ###############################
export const generateJobCloseIdService = () => {
    return new Promise((resolve, reject) => {
      const q = 'SELECT MAX(DOCUMENT_ID) as maxId FROM post_repair_document';
      db.query(q, (err, data) => {
        if (err) {
          reject({ message: "An error occurred!", error: err });
          return;
        }
  
        const maxId = data[0].maxId;
        let newId;
  
        if (maxId) {
          const numericPart = parseInt(maxId.split('-')[2], 10);
          const newNumericPart = String(numericPart + 1).padStart(7, '0');
          newId = `POS-DOC-${newNumericPart}`;
        } else {
          newId = 'POS-DOC-0000001';
        }
        resolve({PostRepairDocumentId: newId });
      });
    }
  );
}
//#################### generate post repair document id - end   ###############################

//#################### add job close data - start #############################################
export const addCloseJobDataService = (postDocId,newBatteryHealth,newEnginePerformance,newTireCondition,newFluidLevels,instructions,shopOwnerNote,dateString,updateJobId) => {
    return new Promise((resolve, reject) => {
      const docData = `INSERT INTO post_repair_document 
                       (DOCUMENT_ID,BATTERY_HEALTH,ENGINE_PERFORMANCE,TIRE_CONDITION,FLUID_LEVELS,MECHANIC_INSTRUCTION,SHOP_OWNER_NOTE)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

      const closeJob = `UPDATE records 
                       SET END_DATE = ?, POST_REPAIR_DOC_ID = ?
                       WHERE JOB_ID = ?`;
  
      db.query(docData, [postDocId,newBatteryHealth,newEnginePerformance,newTireCondition,newFluidLevels,instructions,shopOwnerNote], (err, data) => {
        if (err) {
          reject({message:"Server side error!"});
        }

        db.query(closeJob, [dateString,postDocId,updateJobId],(err,data) => {
            if (err) {
                reject({message:"Server side error!"});
            }else {
                resolve({message: "Job closed!" });
            }
        })
      });
    });
}
//#################### add job close data - end   #############################################

//######################### get ongonig mechnis jobs - Start  ############################################
export const checkWorkingMechanisService = (updateJobId) => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT *
                   FROM work_allocation
                   WHERE STATUS IN ('in progress', 'waiting') AND JOB_ID = ?`;

        db.query(q,[updateJobId], (err,data) => {
            if(err){
                reject({message:"Server side error!"})
            }else if( !data || data.length === 0 ){
                resolve({message:"No"});
            }else{
                resolve({message:"Yes"});
            }
        })
    })
}
//######################### get onging mechnic jobs - end    ############################################
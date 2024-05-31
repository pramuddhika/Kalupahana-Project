import {db} from '../.env';

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
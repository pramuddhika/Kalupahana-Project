import {db} from '../.env';

//############################ get job update main data set - start ##############################
export const generateJobIdService = async(vehicleNumber) => {
    return new Promise( (resolve,reject) => {
        const check = `SELECT JOB_ID
                       FROM records
                       WHERE VEHICLE_NUMBER = ? AND END_DATE IS NULL`;

        const getInfo = `SELECT r.JOB_ID, v.MODEL, v.FULE_TYPE, c.CUSTOMER_NAME, c.EMAIL, c.PHONE_NUMBER
                         FROM records r
                         JOIN vehicle v ON r.VEHICLE_NUMBER = v.VEHICLE_NUMBER
                         JOIN customer c ON v.NIC_NUMBER = c.NIC_NUMBER
                         WHERE r.VEHICLE_NUMBER = ? AND r.END_DATE IS NULL`;

        db.query(check,[vehicleNumber],(err,data)=>{
            if(err){
                reject({err});
                return;
            } else if (data.length === 0 ){
                resolve({message:"No ongoing job!"});
                return;
            }

            db.query(getInfo,[vehicleNumber],(err,data) => {
                if(err){
                    reject({err});
                }else{
                    const UpdateJobData = data.map(item => ({
                        jobId : item.JOB_ID,
                        model : item.MODEL,
                        fule : item.FULE_TYPE,
                        customer : item.CUSTOMER_NAME,
                        email : item.EMAIL,
                        phoneNumber : item.PHONE_NUMBER
                    }))

                    resolve({UpdateJobData});
                    return;
                }
            })
        })
    })
}
//############################ get job update main data set - end   ##############################
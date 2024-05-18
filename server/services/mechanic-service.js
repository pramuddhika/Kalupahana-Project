import {db} from '../.env';

//############################### add mechanic - start ########################
export const addMechanicService = (employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO mechanic (EMPLOYEE_ID,EMPLOYEE_NAME,CONTACT_NUMBER,LIVING_AREA,JOIN_DATE,MAIN_AREA,SUB_AREA) VALUES (?,?,?,?,?,?,?)`;
        db.query(q, [employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea] , (err,data) => {
            if(err){
                reject (err);
            }else if(data && data.lenght === 0){
                reject(new Error('Data can not be found!'));
            }else {
                resolve("Added!");
            }
        })
    })
}
//############################### add mechanic - end   ########################
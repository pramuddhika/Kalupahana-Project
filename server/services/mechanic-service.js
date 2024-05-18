import {db} from '../.env';

//############################### add mechanic - start ########################
export const addMechanicService = (employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO mechanic (EMPLOYEE_ID,EMPLOYEE_NAME,CONTACT_NUMBER,LIVING_AREA,JOIN_DATE,MAIN_AREA,SUB_AREA) 
        VALUES (?,?,?,?,?,?,?)`;
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

//############################# get mechanic data - start ######################################
export const getMechanicService = () => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT EMPLOYEE_ID,EMPLOYEE_NAME,CONTACT_NUMBER,LIVING_AREA,JOIN_DATE,MAIN_AREA,SUB_AREA,RESIGN_DATE FROM mechanic`;

        db.query( q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const mechanicsDetails = data.map(list => ({
                    employeeId : list.EMPLOYEE_ID,
                    employeeName : list.EMPLOYEE_NAME,
                    contactNumber: list.CONTACT_NUMBER,
                    livingArea: list.LIVING_AREA,
                    joinDate : list.JOIN_DATE,
                    mainArea : list.MAIN_AREA,
                    subArea: list.SUB_AREA,
                    resignDate: list.RESIGN_DATE
                }));
                resolve(mechanicsDetails);
            }
        } )
    })
}
//############################# get mechanic data - end   ######################################
import {db} from '../env.js';

//############################### add mechanic - start ########################
export const addMechanicService = (employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea) => {
    return new Promise ( (resolve,reject) => {

        const addMechanic = `INSERT INTO mechanic 
                             (EMPLOYEE_ID,EMPLOYEE_NAME,CONTACT_NUMBER,LIVING_AREA,JOIN_DATE,MAIN_AREA,SUB_AREA) 
                             VALUES (?,?,?,?,?,?,?)`;

        db.query(addMechanic, [employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea] , (err,data) => {
            if(err){
                reject (err);
            }else if(data && data.lenght === 0){
                reject(new Error('Data can not be found!'));
            }else {
                resolve("Registered successfully!");
            }
        })
    })
}
//############################### add mechanic - end   ########################

//############################# get mechanic data - start ######################################
export const getMechanicService = () => {
    return new Promise ( (resolve,reject) => {

        const getData = `SELECT EMPLOYEE_ID, EMPLOYEE_NAME, CONTACT_NUMBER, LIVING_AREA, DATE_FORMAT(JOIN_DATE, '%Y-%m-%d') AS JOIN_DATE,
                         MAIN_AREA, SUB_AREA, DATE_FORMAT(RESIGN_DATE, '%Y-%m-%d') AS RESIGN_DATE 
                         FROM mechanic`;

        db.query( getData, (err,data) => {
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

//############################ update mechanic data - start ###################################
export const updateMechanicService = (employeeName,contactNumber,livingArea,joinDate,mainArea,subArea,resignDate,employeeId) => {
    return new Promise ( (resolve,reject) => {

        const update = `UPDATE mechanic 
                        SET EMPLOYEE_NAME=? , CONTACT_NUMBER=? , LIVING_AREA=? , JOIN_DATE=? , MAIN_AREA=?, SUB_AREA=?, RESIGN_DATE=? 
                        WHERE EMPLOYEE_ID=?`;

        db.query(update, [employeeName,contactNumber,livingArea,joinDate,mainArea,subArea,resignDate,employeeId] , (err,data) => {
            if(err){
                reject (err);
            }else if(data && data.lenght === 0){
                reject(new Error('Data can not be found!'));
            }else {
                resolve("Updated!");
            }
        })
    })
}
//########################### update mechanic data -  end   ####################################

//######################## generate employee ID - start ###############################
export const generateEmployeeNumberService = () => {
    return new Promise((resolve, reject) => {
      const employeeId = 'SELECT MAX(EMPLOYEE_ID) as maxId FROM mechanic';
      db.query(employeeId, (err, data) => {
        if (err) {
          reject({ message: "An error occurred!", error: err });
          return;
        }
  
        const maxId = data[0].maxId;
        let newId;
  
        if (maxId) {
          const numericPart = parseInt(maxId.split('-')[1], 10);
          const newNumericPart = String(numericPart + 1).padStart(6, '0');
          newId = `EID-${newNumericPart}`;
        } else {
          newId = 'EID-000001';
        }
        resolve({EmployeeId: newId });
      });
    }
  );
}
//######################## generate employee ID - end   ###############################
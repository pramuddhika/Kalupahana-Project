import {db} from '../.env';

//######################### get space data - start ############################
export const getSpaceDataService = () => {
  return new Promise ( (resolve,reject) => {
    const q = `SELECT totalSpace,onlineSpaces FROM settings`;

    db.query(q, (err,data) => {
        if(err){
            reject(err);
        }else if (!data || data.lenght === 0){
            reject(new Error('Data can not be found!'));
        }else{
            resolve({
                totalSpace: data[0].totalSpace,
                onlineSpaces: data[0].onlineSpaces
            });
        }
    });
  });
};
//######################### get space data - end   ############################

//######################### updare spaces - start  ############################
export const updateSpaceDataService = (totalSpace,onlineSpaces) => {
    return new Promise ( (resolve,reject) => {
       const q = `UPDATE settings SET totalSpace = ?, onlineSpaces = ?`;
       db.query(q,[totalSpace,onlineSpaces],(err,data) => {
        if(err){
            reject(err);
        }else if (data && data.length === 0){
            reject(new Error('Data can not be found!'));
        }
        else {
            resolve("updated!");
        }        
       })
    });
};
//######################### updare spaces - end    ############################

//######################### add holiday - Start ###############################
export const addHolidayService = (dates) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO holidays (dates) VALUES (?)`;
        db.query(q, [dates], (err,data) => {
            if(err){
                reject (err);
            }else if(data && data.lenght === 0){
                reject(new Error('Data can not be foun!'));
            }else {
                resolve("Added!");
            }
        })
    });
};
//######################### add holiday - end   ###############################
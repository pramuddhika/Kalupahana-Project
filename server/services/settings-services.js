import { resolve } from 'path';
import {db} from '../env.js';
import { rejects } from 'assert';

//######################### get space data & borth notification times - start ############################
export const getSettingsTableDataService = () => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT TOTAL_SPACE, SPACE_FOR_BOOKING, 
                   DATE_FORMAT(NEXT_DAY_BOOKING_NOTIFI_TIME, '%H:%i') as NEXT_DAY_BOOKING_NOTIFI_TIME, 
                   DATE_FORMAT(TODAY_COMING_VEHICLE_RECORDS_NOTIFI_TIME, '%H:%i') as TODAY_COMING_VEHICLE_RECORDS_NOTIFI_TIME 
                   FROM settings`;

      db.query(q, (err,data) => {
          if(err){
               reject(err);
          }else if (!data || data.length === 0){
               reject(new Error('Data can not be found!'));
          }else{
            const settings = data.map(settings => ({
                totalSpace: settings.TOTAL_SPACE,
                bookingSpace: settings.SPACE_FOR_BOOKING,
                nextdayTime: settings.NEXT_DAY_BOOKING_NOTIFI_TIME,
                recordsTime: settings.TODAY_COMING_VEHICLE_RECORDS_NOTIFI_TIME
              }));
              resolve(settings);
          }
      });
    });
  };
//######################### get space data & borth notification times - end   ############################

//######################### update spaces - start  ############################
export const updateSpaceDataService = (totalSpace,bookingSpace) => {
    return new Promise ( (resolve,reject) => {

       const q = `UPDATE settings 
                  SET TOTAL_SPACE = ?, SPACE_FOR_BOOKING = ?`;

       db.query(q,[totalSpace,bookingSpace],(err,data) => {
        if(err){
            reject(err);
        }else {
            resolve("Space data updated!");
        }        
       })
    });
};
//######################### updare spaces - end    ############################

//################## update next day notification time  - start ##############################
export const updateNextDayTimeService  = (nextdayTime) => {
   return new Promise( (resolve,reject) => {

    const q = `UPDATE settings 
               SET NEXT_DAY_BOOKING_NOTIFI_TIME = ? `;

    db.query( q, [nextdayTime], (err,data) => {
        if(err){
            reject(err);
        }else{
            resolve("Notification time updated!");
        }
    })
   })
};
//################## update next day notification time  - end   ##############################

//################## update record check  time  - start ##############################
export const recordCheckService  = (recordsTime) => {
    return new Promise( (resolve,reject) => {

     const q = `UPDATE settings 
                SET TODAY_COMING_VEHICLE_RECORDS_NOTIFI_TIME = ? `;

     db.query( q, [recordsTime], (err,data) => {
         if(err){
             reject(err);
         }else{
             resolve("Notification time updated!");
         }
     })
    })
 };
 //################## update record check time  - end   ##############################


//######################### add holiday - Start ###############################
export const addHolidayService = (date) => {
    return new Promise ( (resolve,reject) => {

        const addHolidat  = `INSERT INTO holidays (HOLIDATE) VALUES (?)`;
        const checkbooking = `SELECT VEHICLE_NUMBER FROM booking
                              WHERE RESERVED_DATE = ? AND STATUS = 'pending'`;

        db.query(checkbooking,[date],(err,data) => {
            if(err){
                reject({message:'Server side error!'});
            }else{
                if(!data || data.length === 0){
                    db.query(addHolidat,[date],(err,data) => {
                        if(err){
                            if (err.code === 'ER_DUP_ENTRY') {
                                reject({ message: 'Already added!' });
                            } else {
                                reject({ message:"Server side error!"});
                            }
                        }else{
                            resolve({message:'Date added!'});
                        }
                    })
                }else{
                    reject({message:"Can't added,Date is taken by customer!"});
                }
            }
        })
    });
};
//######################### add holiday - end   ###############################

//########################## get holidays - start #########################################
export const getHolidayService = () => {
    return new Promise ( (resolve,reject) => {

        const q = `SELECT DATE_FORMAT(HOLIDATE, '%Y-%m-%d') AS HOLIDATE 
                   FROM holidays 
                   WHERE HOLIDATE >= CURDATE()`;

      db.query(q, (err,data) => {
          if(err){
               reject(err);
          }else if (!data || data.length === 0){
               reject(new Error('Data can not be found!'));
          }else{
            const holidays = data.map(days => ({
                holidays: days.HOLIDATE,
              }));
              resolve(holidays);
          }
      });
    });
  };
//########################## get holidays  - end  #########################################

//########################## delete holiday - send  ######################################
export const deleteHolidayService = (deletedate) => {
    return new Promise ( (resolve,reject) => {

        const q = `DELETE FROM holidays 
                   WHERE HOLIDATE = ?`;

        db.query( q,(deletedate),(err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('Date removed!');
            }
        })
    })
}
//########################## delete holiday - send  ######################################

//######################### add specialist area - Start ###############################
export const AddSpecialistAreaService = (speciallistArea) => {
    return new Promise ( (resolve,reject) => {

        const q = `INSERT INTO mechanic_specialist_areas 
                   (SPECIALIST_AREA) VALUES (?)`;

        db.query(q, [speciallistArea], (err,data) => {
            if(err){
                reject (err);
            }else if(data && data.lenght === 0){
                reject(new Error('Data can not be found!'));
            }else {
                resolve("Added!");
            }
        })
    });
};
//######################### add specialist area - end   ###############################

//########################## get specialist Area - start #########################################
export const getSpecialistAreaService = () => {
    return new Promise ( (resolve,reject) => {

        const q = `SELECT SPECIALIST_AREA 
                   FROM mechanic_specialist_areas`;

      db.query(q, (err,data) => {
          if(err){
               reject(err);
          }else if (!data || data.length === 0){
               reject(new Error('Data can not be found!'));
          }else{
            const list = data.map(list => ({
                area: list.SPECIALIST_AREA,
              }));
              resolve(list);
          }
      });
    });
  };
//########################## get specialist Area - end  #########################################

//########################## delete specialist Area - send  ######################################
export const deleteSpecialistAreaService = (deleteAres) => {
    return new Promise ( (resolve,reject) => {

        const q = `DELETE FROM mechanic_specialist_areas 
                   WHERE SPECIALIST_AREA = ?`;

        db.query( q,(deleteAres),(err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('Area deleted!');
            }
        })
    })
}
//########################## delete specialist Area - send  ######################################

//######################### get nextday count -start ############################################
export const getNextDateCountService = () => {
    return new Promise ( (resolve,rejects) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedTomorrow = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

        const q = `SELECT COUNT(*) AS count FROM booking WHERE STATUS = 'pending' AND RESERVED_DATE = '${formattedTomorrow}'`;

        db.query(q,(err,data) => {
            if (err) {
                reject({ message: 'Server side error' });
            } else if (data.length === 0) {
                resolve({ count: 0 });
            } else {
                resolve({ count: data[0].count });
            }
        })
    })
}
//######################### get nextday count -end   ############################################

//######################### get nextday numbers -start ############################################
export const getNextDateNumberService = () => {
    return new Promise ( (resolve,rejects) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedTomorrow = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

        const q = `SELECT VEHICLE_NUMBER FROM booking WHERE STATUS = 'pending' AND RESERVED_DATE = '${formattedTomorrow}'`;

        db.query(q,(err,data) => {
            if (err) {
                rejects({ message: 'Server side error' });
            } else {
                const numbers = data.map(list => ({
                    numbers: list.VEHICLE_NUMBER
                }))
                resolve({numbers});
            }
        })
    })
}
//######################### get nextday numbers -end   ############################################
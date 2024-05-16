import {db} from '../.env';

//######################### get space data & borth notification times - start ############################
export const getSettingsTableDataService = () => {
    return new Promise ( (resolve,reject) => {
      const q = `SELECT TOTAL_SPACE,SPACE_FOR_BOOKING,NEXT_DAY_BOOKING_NOTIFI_TIME,TODAY_COMING_VEHICLE_RECORDS_NOTIFI_TIME FROM settings`;
  
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
export const updateSpaceDataService = (totalSpace,bookingSpaces) => {
    return new Promise ( (resolve,reject) => {
       const q = `UPDATE settings SET TOTAL_SPACE = ?, SPACE_FOR_BOOKING = ?`;
       db.query(q,[totalSpace,bookingSpaces],(err,data) => {
        if(err){
            reject(err);
        }
        else {
            resolve("Space data updated!");
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
                reject(new Error('Data can not be found!'));
            }else {
                resolve("Added!");
            }
        })
    });
};
//######################### add holiday - end   ###############################
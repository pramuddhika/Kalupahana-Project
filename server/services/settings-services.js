import {db} from '../.env/db-env.js';

//######################### get space data - start ############################
export const getSpaceDataService = () => {
  return new Promise ( (resolve,reject) => {
    const q = `SELECT totalSpace,bookingSpaces FROM settings`;

    db.query(q, (err,data) => {
        if(err){
            reject(err);
        }else if (!data || data.lenght === 0){
            reject(new Error('Data can not be found!'));
        }else{
            resolve({
                totalSpace: data[0].totalSpace,
                onlineSpaces: data[0].bookingSpaces
            });
        }
    });
  });
};
//######################### get space data - end   ############################
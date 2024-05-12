import {db} from '../.env';

//################# get number of oline booking -start #############################
export const bookingNumberService = () => {
  return new Promise( (resolve,reject) => {
    const q = `SELECT COUNT(*) AS count FROM booking WHERE status = 'pending'`;
    db.query(q, (err,data) => {
        if(err){
            reject(err);
        }else{
            resolve({
                count: data[0].count
            });
        }
    })
  });
};
//################# get number of oline booking - end #############################
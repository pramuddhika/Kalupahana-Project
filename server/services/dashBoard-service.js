import {db} from '../env.js';

//################# get number of oline booking -start #############################
export const bookingNumberService = () => {
  return new Promise( (resolve,reject) => {
    
    const onlineNum = `SELECT COUNT(*) AS count 
                       FROM booking 
                       WHERE STATUS = 'pending'`;

    db.query(onlineNum, (err,data) => {
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

//################ get number of ongoin jobs - start ##############################
export const getJobNumberservice = () => {
  return new Promise( (resolve,reject) => {
    const ongoinJobs = `SELECT COUNT(*) AS jobs
                        FROM records
                        WHERE END_DATE IS NULL`;

    db.query(ongoinJobs,(err,data) => {
      if(err){
        reject({message:'Server side error!'});
      }else{
        resolve({
          jobs: data[0].jobs
        })
      }
    })
  })
}
//################ get number of ongoin jobs - end   ##############################

//################ get number of free block - start ##############################
export const getFreeBloksService = () => {
  return new Promise( (resolve,reject) => {
    const freeBlocks = `SELECT 
              (settings.TOTAL_SPACE - COALESCE((SELECT COUNT(*) FROM records WHERE END_DATE IS NULL), 0)) AS free_block
              FROM settings`

    db.query(freeBlocks,(err,data) => {
      if(err){
        reject({message:'Server side error!'});
      }else{
        resolve({
          blocks: data[0].free_block
        })
      }
    })
  })
}
//################ get number of free block - end   ##############################


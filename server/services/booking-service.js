import {db} from '../.env/db-env.js'

//#####################  get all resevation data - start ##################################
export const getAllBookings = () => {
    return new Promise ( (resolve, reject) => {
        const q = `SELECT * FROM booking`;

        db.query(q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                resolve(data);
            }
        });
        
    });
};
//#####################  get all resevation data - end   ##################################
import {db} from '../.env';

//##################### add part details - satrt #########################
export const addPartService = (partID,partName,description) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO sparepart (partID,partName,description) VALUES (?,?,?) `;

        db.query( q, [partID,partName,description], (err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('part added!');
            }
        });
    });
}
//##################### add part details - end   #########################

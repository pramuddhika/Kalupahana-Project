import {db} from '../.env';

//##################### add part details - satrt #########################
export const addPartService = (partID,partName,partDescription) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO sparepart (partID,partName,description) VALUES (?,?,?) `;

        db.query( q, [partID,partName,partDescription], (err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('part added!');
            }
        });
    });
}
//##################### add part details - end   #########################

//##################### get part name & ID - start #######################
export const getId_NameService = () => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT partID,partName,description FROM sparepart`;

        db.query( q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const partDetails = data.map(part => ({
                    partID : part.partID,
                    partName : part.partName,
                    description: part.description
                }));
                resolve(partDetails);
            }
        } )
    })
}
//##################### get part name & ID - end   #######################

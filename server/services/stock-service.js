import {db} from '../.env';

//##################### add part details - satrt #########################
export const addPartService = (partID,partName,partDescription) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO spare_parts (PART_ID,PART_NAME,DESCRIPTION) VALUES (?,?,?) `;

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
        const q = `SELECT PART_ID,PART_NAME,DESCRIPTION FROM spare_parts`;

        db.query( q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const partDetails = data.map(part => ({
                    partID : part.PART_ID,
                    partName : part.PART_NAME,
                    description: part.DESCRIPTION
                }));
                resolve(partDetails);
            }
        } )
    })
}
//##################### get part name & ID - end   #######################

//#################### delete part - satrt ###############################
export const deletePartService = (partID) => {
    return new Promise ( (resolve,reject) => {
        const q = `DELETE FROM spare_parts WHERE PART_ID = ?`;
        db.query (q, [partID], (err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('Part deleted!');
            }
        } )
    })
}
//#################### delete part - end   ###############################

//##################### edit part details - start ########################
export const editPartsService = (editPartName,editPartDescription,editPartID) => {
    return new Promise ( (resolve,reject) => {
        const q = `UPDATE spare_parts SET PART_NAME=?, DESCRIPTION = ? WHERE PART_ID = ?`;
        db.query(q,[editPartName,editPartDescription,editPartID], (err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('Part details updates!');
            }
        })
    })
}
//##################### edit part details - end   ########################

//##################### get part name & ID - start #######################
export const searchPartService = (searchID) => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT PART_ID,PART_NAME,DESCRIPTION FROM spare_parts WHERE PART_ID = ?`;

        db.query( q,[searchID], (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const partDetails = data.map(part => ({
                    partID : part.PART_ID,
                    partName : part.PART_NAME,
                    description: part.DESCRIPTION
                }));
                resolve(partDetails);
            }
        } )
    })
}
//##################### get part name & ID - end   #######################

//%%%%%%%%%%%%%%%%%%%%%%%%%% purchases %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//###################### get today purchases - satrt #########################
export const todayPurchasesService = () => {
    return new Promise ( (resolve, reject) => {
        const q = `SELECT PART_ID,QUANTITY FROM purchases WHERE DATE(DATE)=CURDATE()`;
        db.query(q,(err,data) => {
            if(err){
                reject(err);
            }else{
                const purchases = data.map (part => ({
                    partID : part.PART_ID,
                    quantity : part.QUANTITY
                }));
                resolve(purchases);
            }
        })
    })
}
//###################### get today purchases - end   #########################
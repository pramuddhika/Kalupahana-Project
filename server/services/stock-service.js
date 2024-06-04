import {db} from '../env.js';

//##################### add part details - satrt #########################
export const addPartService = (partID,partName,partDescription,partUnit) => {
    return new Promise ( (resolve,reject) => {

        const q = `INSERT INTO spare_parts 
                   (PART_ID,PART_NAME,DESCRIPTION,UNIT) 
                   VALUES (?,?,?,?) `;

        db.query( q, [partID,partName,partDescription,partUnit], (err,data) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    reject({ message: 'Part exists!' });
                } else {
                    reject({ message:"Server side error!"});
                }
            } else {
                resolve({ message: "Part Added!" });
            }
        });
    });
}
//##################### add part details - end   #########################

//##################### get part name & ID - start #######################
export const getId_NameService = () => {
    return new Promise ( (resolve,reject) => {

        const q = `SELECT PART_ID,PART_NAME,DESCRIPTION,QUANTITY,UNIT
                   FROM spare_parts`;

        db.query( q, (err,data) => {
            if(err){
                reject({ message:"Server side error!"});
            }else if ( !data || data.length === 0){
                reject({message:'Data can not be found!'});
            }else {
                const partDetails = data.map(part => ({
                    partID : part.PART_ID,
                    partName : part.PART_NAME,
                    description: part.DESCRIPTION,
                    unit:part.UNIT,
                    quantity: part.QUANTITY
                }));
                resolve({partDetails});
            }
        } )
    })
}
//##################### get part name & ID - end   #######################

//#################### delete part - satrt ###############################
export const deletePartService = (partID) => {
    return new Promise ( (resolve,reject) => {

        const q = `DELETE 
                   FROM spare_parts 
                   WHERE PART_ID = ?`;

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

        const q = `UPDATE spare_parts 
                   SET PART_NAME=?, DESCRIPTION = ? 
                   WHERE PART_ID = ?`;

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

        const q = `SELECT PART_ID,PART_NAME,DESCRIPTION,QUANTITY 
                   FROM spare_parts 
                   WHERE PART_ID = ?`;

        db.query( q,[searchID], (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const partDetails = data.map(part => ({
                    partID : part.PART_ID,
                    partName : part.PART_NAME,
                    description: part.DESCRIPTION,
                    quantity: part.QUANTITY
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

        const q = `SELECT p.PART_ID, DATE_FORMAT(p.DATE, '%Y-%m-%d') as DATE, p.QUANTITY, sp.UNIT 
                   FROM purchases p
                   INNER JOIN spare_parts sp ON p.PART_ID = sp.PART_ID
                   WHERE MONTH(p.DATE) = MONTH(CURDATE()) AND YEAR(p.DATE) = YEAR(CURDATE())`;
        
        db.query(q,(err,data) => {
            if(err){
                reject(err);
            }else{
                const purchases = data.map (part => ({
                    partID : part.PART_ID,
                    date : part.DATE,
                    quantity : part.QUANTITY,
                    unit:part.UNIT
                }));
                resolve(purchases);
            }
        })
    })
}
//###################### get today purchases - end   #########################

//###################### Add Purchases - start ############################
export const AddPurchasesService = async (partID,dates,units) => {
    return new Promise ( (resolve, reject) => {

        const insert = `INSERT INTO purchases 
                        (PART_ID,DATE,QUANTITY) 
                        VALUES(?,?,?)`;

        db.query(insert, [partID,dates,units],(err,data) => {
            if(err){
                reject(err);
                return;
            }

            const update = `UPDATE spare_parts 
                            SET QUANTITY = QUANTITY + ? 
                            WHERE PART_ID = ?`;

            db.query(update, [units,partID],(err,data) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve('Updated part successfully!');
            });
        });
    });
};
//###################### Add Purchases - end   ############################

//###################### delete purchases data - start ####################
export const DeletePurchasesService = async (partid,date,quantity) => {
    return new Promise ( (resolve,reject) => {

        const remove = `DELETE FROM purchases 
                        WHERE PART_ID = ? AND DATE =?`;

        db.query(remove, [partid,date],(err,data) => {
            if(err){
                reject(err);
                return;
            }

            const minimize = `UPDATE spare_parts 
                              SET QUANTITY = QUANTITY - ? 
                              WHERE PART_ID = ?`;

            db.query(minimize, [quantity,partid], (err,data) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve('Part deleted successfully!');
            });
        });
    });
};
//###################### delete purchases data - end   ####################

//##################### filter available parts - start   ########################
export const availblePartsService = () => {
    return new Promise ( (resolve,reject) => {

        const q = `SELECT PART_ID,PART_NAME,DESCRIPTION,QUANTITY 
                   FROM spare_parts 
                   WHERE QUANTITY > 0`;

        db.query( q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const partDetails = data.map(part => ({
                    partID : part.PART_ID,
                    partName : part.PART_NAME,
                    quantity: part.QUANTITY
                }));
                resolve(partDetails);
            }
        } )
    })
}
//##################### filter available parts - end     ########################

//##################### filter not available parts - start   ########################
export const notAvailableService = () => {
    return new Promise ( (resolve,reject) => {

        const q = `SELECT PART_ID,PART_NAME,DESCRIPTION,QUANTITY 
                   FROM spare_parts 
                   WHERE QUANTITY = 0`;

        db.query( q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const partDetails = data.map(part => ({
                    partID : part.PART_ID,
                    partName : part.PART_NAME,
                    quantity: part.QUANTITY
                }));
                resolve(partDetails);
            }
        } )
    })
}
//##################### filter not available parts - start   ########################

//##################### filter low 2 high parts - start   ########################
export const LowToHighService = () => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT PART_ID,PART_NAME,DESCRIPTION,QUANTITY 
                   FROM spare_parts 
                   ORDER BY QUANTITY ASC`;

        db.query( q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const partDetails = data.map(part => ({
                    partID : part.PART_ID,
                    partName : part.PART_NAME,
                    quantity: part.QUANTITY
                }));
                resolve(partDetails);
            }
        } )
    })
}
//##################### filter low 2 high parts - end     ########################

//##################### filter high 2 low parts - start   ########################
export const HighToLowService = () => {
    return new Promise ( (resolve,reject) => {
        const q = `SELECT PART_ID,PART_NAME,DESCRIPTION,QUANTITY 
                   FROM spare_parts 
                   ORDER BY QUANTITY DESC`;

        db.query( q, (err,data) => {
            if(err){
                reject(err);
            }else if ( !data || data.length === 0){
                reject(new Error ('Data can not be found!'))
            }else {
                const partDetails = data.map(part => ({
                    partID : part.PART_ID,
                    partName : part.PART_NAME,
                    quantity: part.QUANTITY
                }));
                resolve(partDetails);
            }
        } )
    })
}
//##################### filter high 2 low parts - end     ########################
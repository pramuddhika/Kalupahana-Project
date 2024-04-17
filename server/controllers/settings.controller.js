import {getSpaceDataService} from '../services/settings-services.js';

// /////////////////////////// get data from database - start ////////////////////////////////// 
// export const getSpaceData = (req,res) => {

//     const q="SELECT totalSpace,bookingSpaces FROM settings" ;

//     db.query(q , (err,data) => {

//         if(err){
//             return res.status(500).json(err)
//         }

//         if(!data || data.length === 0){
//             return res.status(404).json({ error: 'No data found in settings.' });
//         }
//         return res.status(200).json(data);
//     });
// };
// /////////////////////////// get data from database - end //////////////////////////////////



// ///////////////////update space details - start ////////////////////////////////////////////
// export const updateSpaceData = (req, res) => {

//     const { totalSpace, bookingSpaces } = req.body;

//     // Validate inputs
//     if (!totalSpace || !bookingSpaces) {
//         return res.status(400).json({ error: 'totalSpace and bookingSpaces are required.' });
//     }
//     if (typeof totalSpace !== 'number' || typeof bookingSpaces !== 'number') {
//         return res.status(400).json({ error: 'totalSpace and bookingSpaces must be numbers.' });
//     }

//     const q = `UPDATE settings SET totalSpace = ?, bookingSpaces = ?`;

//     db.query(q, [totalSpace, bookingSpaces], (err, data) => {
//         if (err) {
//             return res.status(500).json(err);
//         }
//         return res.status(200).json(data);
//     });
// };
// ///////////////////update space details - end ////////////////////////////////////////////

//############################ get space data - start ######################################
export const getSpaceData = async (req,res) => {
  try{
    const data = await getSpaceDataService();
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//############################ get space data - end   ######################################

//########################### update space data - start #####################################
export const updateSpaceData = async (req,res) => {

};
//########################### update space data - end   #####################################
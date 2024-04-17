import {getSpaceDataService,
        updateSpaceDataService} from '../services/settings-services.js';

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
  const { totalSpace, onlineSpaces} = req.body;
  try{
    const data = await updateSpaceDataService(totalSpace,onlineSpaces);
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err.message);
  }
};
//########################### update space data - end   #####################################
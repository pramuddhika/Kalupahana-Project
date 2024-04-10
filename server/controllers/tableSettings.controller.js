import {db} from '../.env/db.env.js';

export const spaceData = (req,res) => {

    const q="SELECT totalSpace,bookingSpaces FROM settings" ;

    db.query(q , (err,data) => {

        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data);
        
    });
};
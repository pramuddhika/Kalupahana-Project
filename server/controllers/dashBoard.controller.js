import {db} from '../.env/db-env.js'

//////////////get booking count- start /////////////
export const bookingNumber = (req,res) => {

    const q = "SELECT COUNT(*) AS count FROM booking"

    db.query(q, (err,data) => {
        if(err){
            return res.status(500).json(err);
        }
        const count = data[0].count;
        const resData = { count };
        return res.status(200).json(resData);
    })

};

//////////////get booking count- end /////////////
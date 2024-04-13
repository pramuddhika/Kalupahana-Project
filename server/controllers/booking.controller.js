import {db} from '../.env/db.env.js'

//////////// Function to check if a given string is a valid date////////////
const isValidDate = (dateString) => {
    //date format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
    return dateRegex.test(dateString);
};
////////////////////////////////////////////////////////////////////////////


////////////////////// check availble space - start /////////////////////////
export const checkAvailbility = (req,res) => {
    
};
////////////////////// check availble space - end   /////////////////////////


////////////////////////add booking - start //////////////////////////////// 
export const addBooking = (req, res) => {
    const { vehicleNumber, customerName, contactNumber, vehicleCategory, message, date } = req.body;

    // Validate inputs
    if (!vehicleNumber || !customerName || !contactNumber || !vehicleCategory || !message || !date) {
        return res.status(400).json('All fields are required.');
    }
    // if (typeof vehicleNumber === 'string' || typeof customerName === 'string' || typeof contactNumber === 'string' || typeof vehicleCategory === 'string' || typeof message === 'string' || typeof date === 'string') {
    //     return res.status(400).json('Invalid input types.');
    // }

    const q = `INSERT INTO booking (vehicleNumber, customerName, contactNumber, vehicleCategory, message, date) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(q, [vehicleNumber, customerName, contactNumber, vehicleCategory, message, date], (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json('Booking already exists for the provided vehicle number!');
            } else {
                return res.status(500).json('Server side error!');
            }
        }
        return res.status(200).json('Your reservation is successful!');
    });
};
////////////////////////add booking - end ////////////////////////////////


/////////////////////delete booking - start //////////////////////////////
export const cancelBooking = (req,res) => {

    const { vehicleNumber } = req.body;

    const q = `DELETE FROM booking WHERE vehicleNumber = ?`;

    db.query( q, [vehicleNumber], (err,data) => {
        if(err){
            return res.status(500).json(err)
        }
        if( !data || data.length === 0 ){
            return res.status(404).json('No record found in reservation data!')
        }
        return res.status(200).json(data)
    });
};
/////////////////////delete booking - end ////////////////////////////////


/////////////////////get all booking list -start ///////////////////////
export const  bookingInfo = (req,res) => {
   
    const q = `SELECT * FROM booking`;

    db.query( q , (err,data) => {
        if(err){
            return res.status(500).json(err)
        }
        if(!data || data.length === 0){
            return res.status(404).json('No data found in settings.');
        }
        
        return res.status(200).json(data);
    })
};
/////////////////////get all booking list - end  ///////////////////////


////////////////////get today list - start /////////////////////////////
export const todayList = (req,res) => {

    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    const q = `SELECT * FROM booking WHERE date = `;

    res.send(dateString)
}
////////////////////get today list - end   /////////////////////////////
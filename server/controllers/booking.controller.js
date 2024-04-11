import {db} from '../.env/db.env.js'

////////////////////////add booking - start //////////////////////////////// 
export const addBooking = (req, res) => {
    const { vehicleNumber, customerName, contactNumber, vehicleCategory, message, date } = req.body;

    // Validate inputs
    if (!vehicleNumber || !customerName || !contactNumber || !vehicleCategory || !message || !date) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (typeof vehicleNumber !== 'string' || typeof customerName !== 'string' || typeof contactNumber !== 'string' || typeof vehicleCategory !== 'string' || typeof message !== 'string' || !isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid input types.' });
    }

    // Parse the string date into a Date object
    const parsedDate = new Date(date);

    // Validate parsed date
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format.' });
    }

    const q = `INSERT INTO booking (vehicleNumber, customerName, contactNumber, vehicleCategory, message, date) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(q, [vehicleNumber, customerName, contactNumber, vehicleCategory, message, parsedDate], (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Booking already exists for the provided vehicle number.' });
            } else {
                return res.status(500).json(err);
            }
        }
        return res.status(200).json(data);
    });
};

// Function to check if a given string is a valid date
const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; //date format YYYY-MM-DD
    return dateRegex.test(dateString);
};

////////////////////////add booking - end //////////////////////////////// 


/////////////////////get booking information -start ///////////////////////
export const  bookingInfo = (req,res) => {
   
    const q = `SELECT * FROM booking`;

    db.query( q , (err,data) => {
        if(err){
            return res.status(500).json(err)
        }
        if(!data || data.length === 0){
            return res.status(404).json({ error: 'No data found in settings.' });
        }
        return res.status(200).json(data);
    })
};
/////////////////////get booking information -start ///////////////////////